import { useState } from 'react'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Checkbox } from './components/ui/Checkbox'
import { Radio } from './components/ui/Radio'
import { SelectBox } from './components/ui/SelectBox'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownLabel, DropdownSeparator } from './components/ui/Dropdown'
import { Moon, Sun, CheckCircle, Info, AlertTriangle, Terminal, ChevronDown } from 'lucide-react'
import { Toaster } from './components/ui/Toaster'
import { toast } from './hooks/use-toast'
import type { ToasterPosition } from './components/ui/Toaster'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [toastPosition, setToastPosition] = useState<ToasterPosition>('bottom-right')

  const toggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-950'} font-sans`}>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Antigravity UI</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-16 max-w-5xl">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter">Component Showcase</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-[700px] text-lg">
              A premium collection of high-performance React components built with Tailwind CSS.
            </p>
          </div>
          <div className="h-0.5 w-full bg-linear-to-r from-indigo-500 via-transparent to-transparent opacity-20" />
        </section>

        {/* Buttons */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Buttons</h3>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold tracking-wider dark:bg-indigo-900/30 dark:text-indigo-400">Essential</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-4">
              <p className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-widest">Variants</p>
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-4">
              <p className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-widest">Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><CheckCircle className="h-4 w-4"/></Button>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-4">
              <p className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-widest">States</p>
              <div className="flex flex-wrap gap-4">
                <Button isLoading={isLoading} onClick={toggleLoading}>
                  Click me to load
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Inputs & Forms</h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wider dark:bg-emerald-900/30 dark:text-emerald-400">Core</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6">
              <Input label="Full Name" placeholder="John Doe" helperText="Enter your legal name as it appears on your passport." />
              <Input label="Email Address" type="email" placeholder="john@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Input label="Invalid Input" placeholder="Type something..." error="This field is required and must be unique." />
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Selection Controls</p>
                <div className="space-y-4">
                  <Checkbox label="Accept terms and conditions" />
                  <Checkbox label="Subscribe to newsletter" defaultChecked />
                  <Checkbox label="Required checkbox" error="You must accept this to proceed." />
                </div>
              </div>
              <div className="space-y-4">
                 <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Radio Group</p>
                 <div className="flex flex-col gap-3">
                   <Radio name="option" label="Basic Plan - $10/mo" defaultChecked />
                   <Radio name="option" label="Professional Plan - $29/mo" />
                   <Radio name="option" label="Enterprise Plan - $99/mo" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Select */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Select Box</h3>
            <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] uppercase font-bold tracking-wider dark:bg-violet-900/30 dark:text-violet-400">UI</span>
          </div>
          <div className="max-w-md p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6">
            <SelectBox label="Country" options={[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
              { value: 'au', label: 'Australia' },
              { value: 'de', label: 'Germany' },
            ]} />
            <SelectBox label="Role" placeholder="Select a role...">
               <option value="" disabled selected>Choose a role...</option>
               <option value="admin">Administrator</option>
               <option value="editor">Editor</option>
               <option value="viewer">Viewer</option>
            </SelectBox>
          </div>
        </section>

        {/* Dropdown */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Dropdown Menu</h3>
            <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] uppercase font-bold tracking-wider dark:bg-pink-900/30 dark:text-pink-400">Navigation</span>
          </div>
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6 flex gap-4">
            <Dropdown>
              <DropdownTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300">
                Options <ChevronDown className="ml-2 h-4 w-4" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownLabel>My Account</DropdownLabel>
                <DropdownSeparator />
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Billing</DropdownItem>
                <DropdownItem>Team</DropdownItem>
                <DropdownItem>Subscription</DropdownItem>
                <DropdownSeparator />
                <DropdownItem className="text-red-600 dark:text-red-400">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
               <DropdownTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 h-10 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300">
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
               </DropdownTrigger>
               <DropdownMenu className="w-48">
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Duplicate</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem>Archive</DropdownItem>
                  <DropdownItem className="text-red-600 dark:text-red-400">Delete</DropdownItem>
               </DropdownMenu>
            </Dropdown>
          </div>
        </section>

        {/* Toasts */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Toast Notifications</h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] uppercase font-bold tracking-wider dark:bg-blue-900/30 dark:text-blue-400">Feedback</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6">
              <p className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-widest text-center">Trigger Toasts</p>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => toast({ title: "Default", description: "This is a default toast message." })}>
                  Default
                </Button>
                <Button onClick={() => toast({ variant: "success", title: "Success!", description: "Everything went better than expected." })}>
                  Success
                </Button>
                <Button variant="danger" onClick={() => toast({ variant: "error", title: "Error", description: "Something went wrong. Please try again." })}>
                  Error
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => toast({ variant: "info", title: "Information", description: "Here's some useful info for you." })}>
                  Info
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => toast({ variant: "warning", title: "Warning", description: "Be careful with this action." })}>
                  Warning
                </Button>
                <Button variant="secondary" onClick={() => toast({ title: "Custom Icon", description: "Checking the system status...", duration: 5000 })}>
                   <Terminal className="mr-2 h-4 w-4" /> Custom
                </Button>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6">
              <p className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-widest text-center">Positioning</p>
              <div className="grid grid-cols-3 gap-2">
                {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as ToasterPosition[]).map((pos) => (
                  <Button 
                    key={pos}
                    variant={toastPosition === pos ? "primary" : "outline"}
                    size="sm"
                    className="text-[10px] h-8"
                    onClick={() => {
                        setToastPosition(pos);
                        toast({ title: `Position: ${pos}`, description: `Toast will now appear at ${pos}` });
                    }}
                  >
                    {pos}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-zinc-500 text-center italic">Change the position and trigger a toast to see it in action.</p>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
           <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600">
               <Info className="h-6 w-6" />
             </div>
             <div>
               <h4 className="font-semibold">Pure Tailwind</h4>
               <p className="text-sm text-zinc-500">Zero external UI libraries. Just clean, optimized Tailwind CSS.</p>
             </div>
           </div>
           <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
               <CheckCircle className="h-6 w-6" />
             </div>
             <div>
               <h4 className="font-semibold">TypeScript Ready</h4>
               <p className="text-sm text-zinc-500">Fully typed components with complete IntelliSense support.</p>
             </div>
           </div>
           <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600">
               <AlertTriangle className="h-6 w-6" />
             </div>
             <div>
               <h4 className="font-semibold">Accessible</h4>
               <p className="text-sm text-zinc-500">Built with keyboard navigation and screen readers in mind.</p>
             </div>
           </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2026 Antigravity Component Library. Built for Sabir.</p>
        </div>
      </footer>
      <Toaster position={toastPosition} />
    </div>
  )
}

export default App
