import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart, LineChart, ListTodo } from "lucide-react"

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Fitness Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Set goals, log exercises, and visualize your progress all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<ListTodo className="h-10 w-10" />}
                title="Log Exercises"
                description="Easily record your workouts and activities with just a few taps."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10" />}
                title="Set Goals"
                description="Define your fitness objectives and track your progress towards them."
              />
              <FeatureCard
                icon={<LineChart className="h-10 w-10" />}
                title="Visualize Progress"
                description="See your fitness journey unfold with intuitive charts and graphs."
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Fitness Journey?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of users who are already tracking their way to a healthier lifestyle.
                </p>
              </div>
              <div className="flex">
                <Button asChild size="lg" className="m-1">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button asChild size="lg" className="m-1">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Activity className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by the FitTrack team. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/terms" className="text-sm underline">Terms</Link>
            <Link to="/privacy" className="text-sm underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// function ListItem({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// }

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}