import { useMutation } from "@apollo/client";
import Button from "@components/button";
import CheckBox from "@components/checkbox";
import Form from "@components/form";
import InputBox from "@components/input-box";
import { LeftSide, RightSide } from "@components/sides";
import useShowPassword from "@components/use-show-password";
import { LOGIN, LoginFields } from "@features/login/defs";
import { GraphqlErrorType } from "@services/graphql";
import { EMAIL_REGEX } from "@utils/defs";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgLock } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useShowPassword();
	const [login, { data, loading, error }] = useMutation(LOGIN);

	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>({ defaultValues: { rememberMe: false } });

	useEffect(() => {
		if (!error) return;

		error.graphQLErrors.forEach(({ message }) => {
			switch (message) {
				case GraphqlErrorType.EMAIL_NOT_FOUND:
					setError("email", { message: "Email not found" });
					break;
				case GraphqlErrorType.INVALID_PASSWORD:
					setError("password", { message: "Invalid password" });
					break;
			}
		});
	}, [error, setError]);

	useEffect(() => {
		if (!data) return;

		const onClose = () => navigate("/forum");

		toast.success("Logged in successfully", {
			duration: 3000,
			onDismiss: onClose,
			onAutoClose: onClose,
		});
	}, [data, navigate]);

	const onSubmit: SubmitHandler<LoginFields> = ({ email, password, rememberMe }) => {
		login({ variables: { input: { email, password, rememberMe } } });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Login</h1>
			<div className="flex flex-col gap-4">
				<InputBox
					label="Email"
					error={errors.email?.message}
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: EMAIL_REGEX,
							message: "Field must be a valid email",
						},
					})}
				>
					<LeftSide>
						<MdAlternateEmail className="text-lg" />
					</LeftSide>
				</InputBox>
				<InputBox
					label="Password"
					error={errors.password?.message}
					type={showPassword ? "text" : "password"}
					{...register("password", { required: "Password is required" })}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<div className="flex items-center justify-between">
					<CheckBox label="Remember Me" {...register("rememberMe")} />
					<Link to="/login" className="text-sm text-blue-500">
						Forgot password?
					</Link>
				</div>
				<Button
					type="submit"
					size="w-full"
					className="flex items-center justify-center"
					disabled={loading || data}
				>
					{loading ? (
						<AiOutlineLoading3Quarters className="my-1 animate-spin" />
					) : data ? (
						<FaCheck />
					) : (
						"Login"
					)}
				</Button>
				<p className="flex justify-center gap-2 text-sm">
					Don't have an account?
					<Link to="/sign-up" className="text-blue-500">
						Sign Up
					</Link>
				</p>
			</div>
		</Form>
	);
};

export default LoginPage;
