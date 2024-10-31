import { Link, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { setCookie } from '../utils/methods';
import { toast } from 'react-toastify';


function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

    })
    const res = await response.json();
    if (!response.ok) {
      toast.error(res.message, {
        position: "top-left"
      })
    } else {
      toast.success("Login successful", {
        position: "top-left"
      })
      setCookie('token', res.data.token, 1);
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
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

export default Login;
