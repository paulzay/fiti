import { Link, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"

function Signup() {
  const navigate = useNavigate()
  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/v1/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),

    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="py-12 md:py-24 lg:py-32 xl:py-48">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            signup(formData.get("name") as string, formData.get("email") as string, formData.get('password') as string)
          }} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" required />
            </div>
            <Button type="submit">Signup</Button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup;