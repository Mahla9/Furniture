import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';



// Product Store
export const useProductStore = create((set) => ({
  products: [],
  bestSeller:[],
  chairs:[],
  sofas:[],
  tables:[],
  armchairs:[],
  newProducts:[],

  setProducts: (data) => set({ products: data }),
  setBestSeller: (data) => set({ bestSeller: data }),
  setNewProducts: (data) => set({ newProducts: data }),
  setChairs: (data) => set({ chairs: data }),
  setSofas: (data) => set({ sofas: data }),
  setTables: (data) => set({ tables: data }),
  setArmchairs: (data) => set({ armchairs: data }),

}));

// Cart Store
export const useCartStore = create(
  persist((set, get) => ({
    items: [],
    openCart:false,
    
    toggleSideCart: () => set(state=> ({openCart: !state.openCart})),
      
    // for sideCart
    deleteFromCart: (productId) => set({
      items: get().items.filter(item => item.productId !== productId)
    }),

    // for sideCart
    addQuantityItem: (productId) => set({
      items: get().items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }),
    // for add button
    addToCart: (newItem) => {
      const exists = get().items.find(item => item.productId === newItem.productId);
      if (exists) {
        get().addQuantityItem(newItem.productId)
      } 
      else {
        set({ items: [...get().items, { ...newItem, quantity: 1 }] });
      }
      get().toggleSideCart(); // این خط باعث میشه سایدبار باز شه6
  },

  // for sideCart
  reduceQuantityItem: (productId) => {
    const items = get().items.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0); // حذف اگه صفر شد
  
    set({ items });
  },

  // for sideCart
  clearCart: () => set({ items: [] }),
  getBadge: () => get().items.length,

  // محاسبه داینامیک، موقع صدا زدن
  calculateSubtotal: () => get().items.reduce((total, item) => total + item.quantity * item.price, 0)

  }), 
  {
    name: 'cart',
  }
));

// Article Store
export const useArticleStore = create((set) => ({
  articles: [],
  setArticles: (data) => set({ articles: data }),
}));




export const useAuth = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  wishList: [],
  error: null,

  // ✅ REGISTER
  signUp: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return { error };
    console.log("User signed up:", data.user);
    const userId = data.user.id || data.session.user.id ;

    const { error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: userId, username, wishlist: [] }]);

    if (insertError) return { error: insertError };

    return { data: data.user };
  },

  // ✅ LOGIN
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({email, password}) ;
    console.log("🟢 SIGNIN RESPONSE =>", data, error);

    const sessionUser = data.user || data.session.user;

    if (error || !sessionUser) {
      console.warn("❌ Login failed. Reason:", error?.message || "No user returned");
      return { error: error || new Error("No user returned from login") };
    }
    const userId = sessionUser.id;
    const temp = JSON.parse(localStorage.getItem('temp-wishlist')) || [];

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("wishlist, username")
      .eq("id", userId)
      .single();

    if (profileError) return { error: profileError };

    let merged = profileData?.wishlist || [];

    temp.forEach((item) => {
      if (!merged.find((p) => p.productId === item.productId)) {
        merged.push(item);
      }
    });

    await supabase
      .from("profiles")
      .update({ wishlist: merged })
      .eq("id", userId);

    localStorage.removeItem("temp-wishlist");

    set({
      user: { ...sessionUser, username: profileData.username },
      isLoggedIn: true,
      wishList: merged,
    });

    return { data: {...sessionUser} };
  },

  // ✅ GET SESSION
  getSessionUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return;

    const userId = data.user.id || data.session.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("wishlist, username")
      .eq("id", userId)
      .single();

    if (profileError) return;

    set({
      user: { ...data.user, username: profile?.username || "" },
      isLoggedIn: true,
      wishList: profile?.wishlist || [],
    });
  },

  // ✅ LOGOUT
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLoggedIn: false, wishList: [] });
  },

  toggleWishList: async (product) => {
    const { wishList, isLoggedIn, user } = get();

    const exists = wishList.find(
      (item) => item.productId === product.productId
    );
    let updated;

    if (exists) {
      updated = wishList.filter(
        (p) => p.productId !== product.productId
      );
    } else {
      updated = [...wishList, product];
    }

    set({ wishList: updated });

    if (isLoggedIn) {
      await supabase
        .from('profiles')
        .update({ wishlist: updated })
        .eq('id', user.id);
    } else {
      localStorage.setItem('temp-wishlist', JSON.stringify(updated));
    }
  },

  changePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error(error.message);
      set({error:error})
      throw error;
    }

    toast.success('Password changed successfully');
  },
}));

// Auth state change listener (outside the store)
supabase.auth.onAuthStateChange(async (event) => {
  const { getSessionUser, signOut } = useAuth.getState();

  if (event === 'SIGNED_IN') {
    await getSessionUser();
  }

  if (event === 'SIGNED_OUT') {
    await signOut();
  }
});






// checkout
export const useCheckoutStore = create(
  persist(
    (set) => ({
      shippingAddress:{
        country:"",
        city:"",
        zipCode:"",
        streetAddress:"",
        firstName: "",
        lastName: "",
        phone: "",
        email:"",
      },

      orders: [], //orderId, date, status

      paymentMethod:"",


      // Actions (Optimized)
      setShippingAddress: (field, value) => {
        set(state=>({
          shippingAddress: {
            ...state.shippingAddress,
            [field]: value
          }
        }))
      },

      addOrder: (newOrder) =>
        set(state => ({
          orders: [...state.orders, newOrder]
        })),
      
      // این بخش کد برای پنل ادمین به درد میخوره که وضعیت سفارشو تغییر بده
      //status: on hold > processing > shipped > delivered
      updateOrderStatus: (orderId, newStatus) =>
        set(state => ({
          orders: state.orders.map(order =>
            order.orderId === orderId
              ? { ...order, status: newStatus }
              : order
          )
        })),

      setPaymentMethod: (method) => set({paymentMethod: method}),

    }),{
      name: 'checkout'
    }
  )
);