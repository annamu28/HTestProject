import { useState } from 'react'
import apiService from '../services/apiService'

export const useUserForm = (sectors) => {
  const [formData, setFormData] = useState({
    name: '',
    sectors: [],
    agreed_to_terms: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [selectedSectors, setSelectedSectors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSectorChange = (level, value) => {
    // Remove all selections from this level and below
    setSelectedSectors(prev => prev.filter(s => s.level < level))
    
    // Add the new selection
    const selectedSector = sectors.find(s => s.value === value)
    if (selectedSector) {
      setSelectedSectors(prev => [...prev, selectedSector])
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    if (selectedSectors.length === 0) {
      errors.sectors = 'Please select at least one sector'
    } else {
      // Check if the last selected sector is a leaf node (has no children)
      const lastSector = selectedSectors[selectedSectors.length - 1]
      const hasChildren = sectors.some(s => s.parent_value === lastSector.value)
      if (hasChildren) {
        errors.sectors = 'Please select a specific sector (not a category)'
      }
    }
    if (!formData.agreed_to_terms) {
      errors.agreed_to_terms = 'You must agree to the terms'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationErrors({})
    setIsSubmitting(true)
    setSuccessMessage('')
    setError(null)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    // Get only the last selected sector
    const lastSelectedSector = selectedSectors[selectedSectors.length - 1]

    const requestData = {
      name: formData.name,
      sectors: [lastSelectedSector.value],
      agreed_to_terms: formData.agreed_to_terms
    }

    try {
      let response
      
      if (isEditing) {
        response = await apiService.updateUser(currentUserId, requestData)
        setSuccessMessage('Data updated successfully!')
      } else {
        response = await apiService.createUser(requestData)
        setSuccessMessage('Data saved successfully!')
      }
      
      setSuccess(true)
      
      if (!isEditing && response.id) {
        await fetchUserData(response.id)
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      })
      
      if (err.response) {
        setError(err.response.data.error || 'Failed to save data. Please try again.')
      } else if (err.request) {
        setError('No response from server. Please check your connection.')
      } else {
        setError('Failed to save data. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchUserData = async (userId) => {
    try {
      const userData = await apiService.getUserById(userId)
      
      setFormData({
        name: userData.name,
        sectors: [],
        agreed_to_terms: userData.agreed_to_terms
      })

      const userSectors = userData.sectors || []
      
      if (userSectors.length > 0) {
        const lastSector = userSectors[userSectors.length - 1]
        
        const sectorPath = []
        let currentSector = lastSector
        
        while (currentSector) {
          sectorPath.unshift(currentSector)
          if (currentSector.parent_value) {
            currentSector = userSectors.find(s => s.value === currentSector.parent_value)
          } else {
            currentSector = null
          }
        }
      
        setSelectedSectors(sectorPath)
      }
      
      setIsEditing(true)
      setCurrentUserId(userId)
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError('Failed to fetch user data')
    }
  }

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    validationErrors,
    selectedSectors,
    setSelectedSectors,
    isSubmitting,
    successMessage,
    isEditing,
    handleInputChange,
    handleSectorChange,
    handleSubmit,
    fetchUserData
  }
} 