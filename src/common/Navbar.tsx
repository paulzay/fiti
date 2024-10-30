import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Activity, Dumbbell } from "lucide-react"
import { Button } from '@/components/ui/button'
import './style.css'
import { useAuth } from '@/utils/methods'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  useEffect(() => {
  }, []);

  return (
    <header className="border-b w-full fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <NavigationMenu className="py-2 mb-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="flex items-center space-x-2">
                  <Activity className="h-6 w-6" />
                  <span className="font-bold">FitTrack</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Dumbbell className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">FitTrack</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Your all-in-one fitness tracking solution
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="#" title="Log Exercises">
                    Record your workouts and activities
                  </ListItem>
                  <ListItem href="/#" title="Set Goals">
                    Define and track your fitness objectives
                  </ListItem>
                  <ListItem href="#" title="Track Progress">
                    Visualize your fitness journey
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className=''>
              {
                isAuthenticated ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      {/* <p>Welcome, {user?.name}!</p> */}
                      <Button className='ml-2' onClick={handleLogout}>Logout</Button>
                    </div>
                  </>

                ) : (
                  <>
                    <Link className='mr-2' to="/signup">
                      <NavigationMenuLink>Signup</NavigationMenuLink>
                    </Link>
                    <Link to="/login">
                      <NavigationMenuLink>Login</NavigationMenuLink>
                    </Link>
                  </>
                )
              }
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

export default Navbar

function ListItem({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}