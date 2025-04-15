import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  pasword: z.string().min(8, "Password must be at least 8 characters long!"),
});

type SignupSchema = z.infer<typeof formSchema>;

const SignUp = ({
  handleChangeState,
}: {
  handleChangeState: (state: string) => void;
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: SignupSchema) => {
    reset();
  };

  return (
    <div>
      <br />
      <h1 className="text-[25px] font-[500] font-Poppins text-center py-2">
        Sign up with Henry
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between gap-4 items-end">
          {/* NAME */}
          <div className=" mt-5 relative mb-1 flex flex-col gap-2">
            <label className="text-[16px] font-Poppins">Enter your name</label>
            <input
              placeholder="login@gmail.com"
              type="email"
              {...register("email")}
              className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins "
            />
            {errors.email && (
              <span className="text-red-500 block mt-1">
                {`${errors.email.message}`}
              </span>
            )}
          </div>
          {/* EMAIL */}
          <div className=" mt-5 relative mb-1 flex flex-col gap-2">
            <label className="text-[16px] font-Poppins">Enter your email</label>
            <input
              placeholder="David Johnson"
              type="email"
              {...register("email")}
              className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins "
            />
            {errors.email && (
              <span className="text-red-500 block mt-1">
                {`${errors.email.message}`}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4 items-end">
          {/* PHONE NUMBEr */}
          <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
            <label className="text-[16px] font-Poppins">
              Enter your phone number
            </label>
            <input
              placeholder="login@gmail.com"
              type="email"
              {...register("email")}
              className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins "
            />
            {errors.email && (
              <span className="text-red-500 block mt-1">
                {`${errors.email.message}`}
              </span>
            )}
          </div>
          {/* PASSWORD */}
          <div className="w-full mt-5 relative mb-1 flex flex-col gap-2">
            <label className="text-[16px] font-Poppins">
              Enter your password
            </label>
            <input
              type="password"
              {...register("email")}
              className="w-full bg-transparent border rounded h-[40px] p-2 outline-none mt-[10px] font-Poppins "
              placeholder="piweur(')('"
            />
            {errors.pasword && (
              <span className="text-red-500 block mt-1">
                {`${errors.pasword.message}`}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-5 flex flex-col gap-2">
          <span
            className={clsx(
              "text-[16px] font-Poppins ",
              "py-2 text-black cursor-pointer",
            )}
          >
            Forgot your password?
          </span>
          <Button
            className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer"
            disabled={isSubmitting}
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        <br />
        <h5 className="text-center  text-[14px] ">Or join with</h5>
        <p className="text-black text-center">
          Doesn&apos;t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              handleChangeState("Login");
            }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
