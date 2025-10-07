import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {

    return (
        <div className="grid grid-cols-2 w-full h-screen overflow-hidden">
            <div className="flex items-center justify-center w-full">
                <img
                    className="w-full h-full object-cover"
                    src="src/assets/Photo.png"
                    alt="img"
                />
            </div>
            <div className="flex items-center justify-center w-full">
                <RegisterForm />
            </div>
        </div>
    )
}
