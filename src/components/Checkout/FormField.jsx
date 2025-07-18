

const FormField = ({ id, label, register, error, type = "text", onChange }) => (

  <div className='basis-1/2 flex flex-col gap-1'>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      {...register(id)}
      onChange={onChange}
      className='h-10 rounded-full bg-transparent border border-gray-400 focus:outline-none pl-6'
      placeholder={id==="phone"?"example: 912 xxx xxxx":""}
    />
    {error && <p className='text-red-400 text-xs font-semibold'>{error.message}</p>}
  </div>
);

export default FormField;