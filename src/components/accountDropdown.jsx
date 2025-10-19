import { useState } from 'react';
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

export default function AccountDropdown() {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (option) => {
        setSelectedOption(option);
        navigate(`${option}`)
        console.log(`Navigating to: ${option}`);
    };


    return (
        <div className="flex items-center justify-center ">
            <div className="">
                <DropdownMenu>
                    <DropdownMenuTrigger className="">
                        <div className="h-10 rounded-full bg-background border flex items-center p-2 gap-2 justify-evenly">
                            <img src={avatarImg} />
                            <p>Account</p>
                            <ChevronDown className="text-muted-foreground size-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel> Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => handleNavigation('/profile')}
                            className="cursor-pointer"
                        >
                            <User className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleNavigation('/profile/appearance')}
                            className="cursor-pointer"
                        >
                            <Palette className="w-4 h-4 mr-2" />
                            <span>Appearance</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleNavigation('/profile/change-password')}
                            className="cursor-pointer"
                        >
                            <KeyRound className="w-4 h-4 mr-2" />
                            <span>Password</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}