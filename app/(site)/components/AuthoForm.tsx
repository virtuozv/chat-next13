"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "./inputs/Input";
import Button from "./Button";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthoForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Something went wrong on Register!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      axios
        .post("/api/login", data)
        .catch(() => toast.error("Something went wrong on Login!"))
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Register
  };

  return (
    <div
      className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
            "
    >
      <div
        className="
            bg-white
            px-6
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
                "
      >
        <form
          className="
                space-y-6
            "
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button fullWidth disabled={isLoading}>
              {variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm ">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
        <div
          className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger? "
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="underline hover:text-[#3f78e2] cursor-pointer hover:no-underline"
          >
            {variant === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoForm;
