"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChartContainer } from "@/components/ui/chart"
import { Exercise, Goal, User } from "@/types"
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts"


function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [goal, setGoal] = useState<Goal>({ exerciseMinutes: 150, exerciseFrequency: 3, exerciseType: "Any" })
  const [newExercise, setNewExercise] = useState({ name: "", duration: "", type: "", sets: "", reps: "" })
  const [user, setUser] = useState<User | null>(null)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)

  const navigate = useNavigate();

  useEffect(() => {
    const storedExercises = localStorage.getItem("exercises")
    const storedGoal = localStorage.getItem("goal")
    const storedUser = localStorage.getItem("user")

    if (storedExercises) setExercises(JSON.parse(storedExercises))
    if (storedGoal) setGoal(JSON.parse(storedGoal))
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises))
    localStorage.setItem("goal", JSON.stringify(goal))
  }, [exercises, goal])

  const addExercise = (e: React.FormEvent) => {
    e.preventDefault()
    const exercise: Exercise = {
      id: Date.now(),
      name: newExercise.name,
      duration: Number(newExercise.duration),
      date: new Date().toISOString().split('T')[0],
      type: newExercise.type,
      sets: Number(newExercise.sets),
      reps: Number(newExercise.reps)
    }
    setExercises([...exercises, exercise])
    setNewExercise({ name: "", duration: "", type: "", sets: "", reps: "" })
  }

  const updateGoal = (field: keyof Goal, value: number | string) => {
    setGoal({ ...goal, [field]: value })
  }

  const deleteExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id))
  }

  const editExercise = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setNewExercise({
      name: exercise.name,
      duration: exercise.duration.toString(),
      type: exercise.type,
      sets: exercise.sets.toString(),
      reps: exercise.reps.toString()
    })
  }

  const updateExercise = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingExercise) {
      const updatedExercises = exercises.map(exercise =>
        exercise.id === editingExercise.id
          ? { ...exercise, name: newExercise.name, duration: Number(newExercise.duration), type: newExercise.type }
          : exercise
      )
      setExercises(updatedExercises)
      setEditingExercise(null)
      setNewExercise({ name: "", duration: "", type: "", sets: "", reps: "" })
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate('/')
  }

  const totalMinutes = exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
  const progress = Math.min((totalMinutes / goal.exerciseMinutes) * 100, 100)

  const exercisesByDate = exercises.reduce((acc, exercise) => {
    const date = exercise.date
    if (!acc[date]) {
      acc[date] = 0
    }
    acc[date] += exercise.duration
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(exercisesByDate).map(([date, duration]) => ({ date, duration }))

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p>Welcome, {user?.name}!</p>
        <Button onClick={logout}>Logout</Button>
      </div>

      <Tabs defaultValue="log">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="log">Log Exercise</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>{editingExercise ? "Edit Exercise" : "Log Exercise"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingExercise ? updateExercise : addExercise} className="space-y-4">
                <div>
                  <Label htmlFor="exercise-name">Exercise Name</Label>
                  <Select onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}>
                    <SelectTrigger id="exercise-name">
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pushups">Pushups</SelectItem>
                      <SelectItem value="Squats">Squats</SelectItem>
                      <SelectItem value="Planks">Planks</SelectItem>
                      <SelectItem value="Jumping Jacks">Jumping Jacks</SelectItem>
                      <SelectItem value="Burpees">Burpees</SelectItem>
                      <SelectItem value="Lunges">Lunges</SelectItem>
                      <SelectItem value="Situps">Situps</SelectItem>
                      <SelectItem value="Mountain Climbers">Mountain Climbers</SelectItem>
                      <SelectItem value="Leg Raises">Leg Raises</SelectItem>
                      <SelectItem value="Bicycle Crunches">Bicycle Crunches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="exercise-duration">Duration (minutes)</Label>
                  <Input
                    id="exercise-duration"
                    type="number"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="exercise-sets">Sets</Label>
                  <Input
                    id="exercise-sets"
                    type="number"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="exercise-reps">Reps</Label>
                  <Input
                    id="exercise-reps"
                    value={newExercise.reps}
                    type="number"
                    onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="exercise-type">Exercise Type</Label>
                  <Select onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}>
                    <SelectTrigger id="exercise-type">
                      <SelectValue placeholder="Select exercise type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="Flexibility">Flexibility</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">{editingExercise ? "Update Exercise" : "Log Exercise"}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal-minutes">Exercise Minutes per Week</Label>
                  <Input
                    id="goal-minutes"
                    type="number"
                    value={goal.exerciseMinutes}
                    onChange={(e) => updateGoal("exerciseMinutes", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="goal-frequency">Exercise Days per Week</Label>
                  <Input
                    id="goal-frequency"
                    type="number"
                    value={goal.exerciseFrequency}
                    onChange={(e) => updateGoal("exerciseFrequency", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="goal-type">Primary Exercise Type</Label>
                  <Select onValueChange={(value) => updateGoal("exerciseType", value)}>
                    <SelectTrigger id="goal-type">
                      <SelectValue placeholder="Select exercise type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="Flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Minutes Goal Progress</Label>
                  <Progress value={progress} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {totalMinutes} / {goal.exerciseMinutes} minutes
                  </p>
                </div>
                <div>
                  <Label>Exercise Frequency Progress</Label>
                  <Progress value={(exercises.length / goal.exerciseFrequency) * 100} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {exercises.length} / {goal.exerciseFrequency} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Exercise Duration Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  duration: {
                    label: "Duration (minutes)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="duration" stroke="var(--color-duration)" name="Duration" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {exercises.map((exercise) => (
                    <li key={exercise.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">{exercise.date} - {exercise.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p>{exercise.duration} minutes</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => editExercise(exercise)}>Edit</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Exercise</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={updateExercise} className="space-y-4">
                              <div>
                                <Label htmlFor="edit-exercise-name">Exercise Name</Label>
                                <Input
                                  id="edit-exercise-name"
                                  value={newExercise.name}
                                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-exercise-duration">Duration (minutes)</Label>
                                <Input
                                  id="edit-exercise-duration"
                                  type="number"
                                  value={newExercise.duration}
                                  onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-exercise-type">Exercise Type</Label>
                                <Select onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}>
                                  <SelectTrigger id="edit-exercise-type">
                                    <SelectValue placeholder="Select exercise type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Cardio">Cardio</SelectItem>
                                    <SelectItem value="Strength">Strength</SelectItem>
                                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button type="submit">Update Exercise</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => deleteExercise(exercise.id)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Home