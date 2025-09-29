import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    return (
        // <div className="bg-background flex m-0 items-center justify-center">
        //     <div className="flex grow-1 bg-amber-100">
        //         {/* <img  src="src/assets/Photo.png" alt="img" /> */}
        //         text
        //     </div>
        //     <div className="w-full h-full max-w-screen max-h-screen">
        //         <LoginForm />
        //     </div>
        // </div>
        <div className="grid grid-cols-2 w-full h-screen overflow-hidden">
            <div className="flex items-center justify-center w-full">
                <img
                    className="w-full h-full object-cover"
                    src="src/assets/Photo.png"
                    alt="img"
                />
            </div>
            <div className="flex items-center justify-center w-full">
                <LoginForm />
            </div>
        </div>

    )
}
