"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, BookOpen, Award, TrendingUp } from "lucide-react"
import { courses } from "@/lib/courses-data"
import { calculateScore, calculateGrade } from "@/lib/grade-calculations"

export function GradeCalculator() {
  const [level, setLevel] = useState("")
  const [course, setCourse] = useState("")
  const [inputs, setInputs] = useState<Record<string, number>>({})
  const [result, setResult] = useState<{ score: string; grade: string; comment: string } | null>(null)

  const handleLevelChange = (value: string) => {
    setLevel(value)
    setCourse("")
    setInputs({})
    setResult(null)
  }

  const handleCourseChange = (value: string) => {
    setCourse(value)
    setInputs({})
    setResult(null)
  }

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value) || 0,
    }))
  }

  const handleCalculate = () => {
    if (!level || !course) return

    const score = calculateScore(course, inputs, level)
    const { grade, comment } = calculateGrade(score)
    setResult({ score: score.toFixed(2), grade, comment })
  }

  const selectedCourse = courses[level as keyof typeof courses]?.find((c) => c.name === course)

  const handleQuickLinkClick = (linkName: string) => {
    const funnyMessages = [
      `${linkName}? LOL! I don't have time to implement this feature. I'm too busy calculating your mediocre grades! 😂`,
      `Sorry, ${linkName} is currently unavailable. The developer is probably procrastinating on Netflix 🍿`,
      `${linkName} coming soon! (Translation: Never. But thanks for clicking!) 🤡`,
      `Error 404: ${linkName} not found. Just like your motivation to study! 💀`,
      `${linkName}? That's cute. Maybe try Google instead? 🤷‍♂️`,
    ]
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
    alert(randomMessage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sans">PassMeter</h1>
              <p className="text-sm text-muted-foreground font-mono">IITM BS Grade Calculator</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold font-sans">Grade Calculator</h2>
            </div>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              Calculate your grades for IIT Madras BSc program courses. Warning: Results may cause existential crisis!
              🎭
            </p>
          </div>

          {/* Main Calculator Card */}
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 font-sans">
                <TrendingUp className="w-5 h-5 text-primary" />
                Course Selection
              </CardTitle>
              <CardDescription className="font-mono">
                Choose your program level and course to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level and Course Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="level" className="font-mono font-medium">
                    Program Level
                  </Label>
                  <Select value={level} onValueChange={handleLevelChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your program level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foundation">Foundation Level</SelectItem>
                      <SelectItem value="diploma">Diploma Level</SelectItem>
                      <SelectItem value="degree">Degree Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {level && (
                  <div className="space-y-2">
                    <Label htmlFor="course" className="font-mono font-medium">
                      Course
                    </Label>
                    <Select value={course} onValueChange={handleCourseChange}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses[level as keyof typeof courses]?.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Score Inputs */}
              {selectedCourse && (
                <Card className="bg-muted/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-sans">Enter Your Scores</CardTitle>
                    <CardDescription className="font-mono">
                      Input your scores for each component (0-100%)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedCourse.inputs
                        .filter((input) => input !== "Bonus")
                        .map((input) => (
                          <div key={input} className="space-y-2">
                            <Label htmlFor={input} className="font-mono text-sm font-medium">
                              {input}
                              <span className="text-muted-foreground ml-1">(%)</span>
                            </Label>
                            <Input
                              id={input}
                              type="number"
                              value={inputs[input] ?? ""}
                              onChange={(e) => handleInputChange(input, e.target.value)}
                              className="h-10"
                              min="0"
                              max="100"
                              placeholder="0"
                            />
                          </div>
                        ))}
                      {selectedCourse.bonus && (
                        <div className="space-y-2">
                          <Label htmlFor="Bonus" className="font-mono text-sm font-medium">
                            Bonus
                            <span className="text-muted-foreground ml-1">(max {selectedCourse.bonus})</span>
                          </Label>
                          <Input
                            id="Bonus"
                            type="number"
                            value={inputs.Bonus ?? ""}
                            onChange={(e) => handleInputChange("Bonus", e.target.value)}
                            className="h-10"
                            min="0"
                            max={selectedCourse.bonus.toString()}
                            placeholder="0"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Calculate Button */}
              <Button
                onClick={handleCalculate}
                disabled={!course}
                className="w-full h-12 text-lg font-mono font-medium"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Grade
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {result && (
            <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 font-sans">
                  <Award className="w-6 h-6 text-primary" />
                  Your Results (Brace Yourself!)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Final Score</p>
                    <p className="text-3xl font-bold font-sans text-primary">{result.score}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Letter Grade</p>
                    <Badge
                      variant={result.grade === "S" || result.grade === "A" ? "default" : "secondary"}
                      className="text-2xl font-bold font-sans px-4 py-2 h-auto"
                    >
                      {result.grade}
                    </Badge>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">Brutal Honesty</p>
                    <p className="text-sm font-mono italic text-card-foreground">{result.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-sans">ReadOrbit</h3>
              </div>
              <p className="text-sm font-mono text-muted-foreground">
                Empowering education with cutting-edge tools and premium sarcasm for academic reality checks.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold font-sans">Quick Links (That Don't Work)</h3>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <button
                    onClick={() => handleQuickLinkClick("Grade Calculator")}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Grade Calculator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickLinkClick("Course Planner")}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Course Planner
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickLinkClick("Study Resources")}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Study Resources
                  </button>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold font-sans">Contact (Good Luck!)</h3>
              <div className="text-sm font-mono text-muted-foreground space-y-1">
                <p>support@readorbit.com (We'll ignore your emails)</p>
                <p>+DIAL-READ-ORBIT (Line always busy)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm font-mono text-muted-foreground">
            © 2025 ReadOrbit. All rights reserved. (Including the right to judge your grades)
          </div>
        </div>
      </footer>
    </div>
  )
}
