import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


function Form({ addExercise, newExercise, setNewExercise, editingExercise, updateExercise }: any) {
  return (
    <form onSubmit={editingExercise ? updateExercise : addExercise} className="space-y-4">
      <div>
        <Label htmlFor="exercise-name">Exercise Name</Label>
        <Select value={editingExercise ? newExercise.name : ""} onValueChange={(value) => setNewExercise({ ...newExercise, name: value })}>
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
        <Select value={editingExercise ? newExercise.type : ""} onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}>
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
  )
}

export default Form