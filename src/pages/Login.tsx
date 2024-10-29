import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { setCookie } from "@/utils/methods";


function Login() {
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

    })
    console.log(response)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const json = await response.json();
      setCookie('auth', json.token, 1)
      navigate("/dashboard")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          login(formData.get("email") as string, formData.get("password") as string)
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
        </form>
      </CardContent>
    </Card>
  )
}

export default Login