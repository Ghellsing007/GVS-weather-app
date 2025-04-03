"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsFetching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5&featuretype=city`
      )
      const data: { display_name: string }[] = await response.json()
      const citySuggestions = data.map((item) => item.display_name)
      setSuggestions(citySuggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
    } finally {
      setIsFetching(false)
    }
  }

  const debouncedFetch = debounce(fetchSuggestions, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedFetch(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setSuggestions([])
    onSearch(suggestion)
    setIsFocused(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
      setSuggestions([])
      setIsFocused(false)
    }
  }

  return (
    <div className="relative flex w-full max-w-sm flex-col">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={isFetching}>
          {isFetching ? (
            <span className="animate-spin">...</span>
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="sr-only">Buscar</span>
        </Button>
      </form>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 z-10 mt-1 w-full max-w-sm rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {isFetching && isFocused && suggestions.length === 0 && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full max-w-sm rounded-md border bg-white shadow-lg p-2 text-gray-500">
          Cargando sugerencias...
        </div>
      )}
    </div>
  )
}