import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabaseClient';



// Product Store
export const useProductStore = create((set) => ({
  products: [],
  bestSeller:[],
  newProducts:[],

  setProducts: (data) => set({ products: data }),
  setBestSeller: (data) => set({ bestSeller: data }),
  setNewProducts: (data) => set({ newProducts: data }),
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
      get().toggleSideCart(); // این خط باعث میشه سایدبار باز شه
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

  // REGISTER
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

  // LOGIN
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({email, password}) ;
    console.log(" SIGNIN RESPONSE =>", data, error);

    const sessionUser = data.user || data.session.user;

    if (error || !sessionUser) {
      console.warn(" Login failed. Reason:", error?.message || "No user returned");
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


  // LOGOUT
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isLoggedIn: false, wishList: [] });
  },

  // INIT AUTH for refresh
  initAuth: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data?.session?.user) {
      set({ user: null, isLoggedIn: false });
      return;
    }

    const sessionUser = data.session.user;
    const userId = sessionUser.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("wishlist, username")
      .eq("id", userId)
      .single();

    if (profileError) {
      set({ user: sessionUser, isLoggedIn: true, wishList: [] });
      return;
    }

    set({
      user: { ...sessionUser, username: profile?.username || "" },
      isLoggedIn: true,
      wishList: profile?.wishlist || [],
    });
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

  // forgot password => send reset email
  forgotPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return true;
  },

  // Change Password
  changePassword: (newPassword) => {
   supabase.auth.updateUser({
      password: newPassword,
    });
  },
}));






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
        note:""
      },

      orders: [], //orderId, date, status

      paymentMethod:"",


      // Actions (Optimized)
      setFullShippingAddress: (address) =>
        set(() => ({
          shippingAddress: address
        })),


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