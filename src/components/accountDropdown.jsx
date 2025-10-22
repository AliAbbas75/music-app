import { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import avatarImg from "@/assets/Ellipse 22.png"
import { User, Palette, KeyRound, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from "@/store/authStore";

export default function AccountDropdown() {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const handleNavigation = (option) => {
        setSelectedOption(option);
        navigate(`${option}`)
        console.log(`Navigating to: ${option}`);
    };


    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus:ring-0">
                    <div className="flex items-center gap-2 bg-background border rounded-full px-3 py-1">
                        <img
                            src={user?.profileImage?.url || "/default-avatar.png"}
                            alt="Profile"
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                        />
                        <p className="text-sm text-muted-foreground hidden sm:block">Account</p>
                        <ChevronDown className="text-muted-foreground size-4" />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => handleNavigation("/profile")}
                        className="cursor-pointer"
                    >
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => handleNavigation("/profile/appearance")}
                        className="cursor-pointer"
                    >
                        <Palette className="w-4 h-4 mr-2" />
                        <span>Appearance</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => handleNavigation("/profile/change-password")}
                        className="cursor-pointer"
                    >
                        <KeyRound className="w-4 h-4 mr-2" />
                        <span>Password</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    );
}