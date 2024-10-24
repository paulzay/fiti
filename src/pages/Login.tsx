import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { User } from '@/types'
import { useState } from 'react'
import { Label } from "@/components/ui/label"


function Login() {
  const navigate = useNavigate()
  const [, setUser] = useState<User | null>(null)
  const login = (name: string, email: string) => {
    const user = { name, email }
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    navigate("/home")
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
          login(formData.get("name") as string, formData.get("email") as string)
        }} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login