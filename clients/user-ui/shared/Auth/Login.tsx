import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Button } from "@heroui/button";

import styles from "@/utils/style";

const formSchema = z.object({
  email: z.string(),
  pasword: z.string().min(8, "Password must be at least 8 characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;
const Login = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <br />
      <h1 className="text-[25px] font-[500] font-Poppins text-center py-2">
        Login with Henry
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
          <label className="text-[16px] font-Poppins text-white">
            Enter your email
          </label>
          <input
            placeholder="login@gmail.com"
            type="email"
            {...register("email")}
            className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins text-white"
          />
          {errors.email && (
            <span className="text-red-500 block mt-1">
              {`${errors.email.message}`}
            </span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
          <label className="text-[16px] font-Poppins text-white">
            Enter your password
          </label>
          <input
            type="password"
            {...register("email")}
            className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins text-white"
          />
          {errors.pasword && (
            <span className="text-red-500 block mt-1">
              {`${errors.pasword.message}`}
            </span>
          )}
        </div>
        <div className="w-full mt-5 flex flex-col gap-2">
          <span
            className={clsx(styles.label, "py-2 text-[#4740ca] cursor-pointer")}
          >
            Forgot your password?
          </span>
          <Button
            className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer"
            disabled={isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </div>
        <br />
        <h5 className="text-center pt-4 text-[14px] text-white">
          Or join with
        </h5>
      </form>
    </div>
  );
};

export default Login;
