import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { useAuth } from '../utils/methods';


function Login() {
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      login(email, password)
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="py-12 md:py-24 lg:py-32 xl:py-48">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleLogin(formData.get("email") as string, formData.get("password") as string)
          }} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit">Login</Button>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login