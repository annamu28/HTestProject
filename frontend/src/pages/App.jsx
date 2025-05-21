import { useState, useEffect } from 'react'
import { Container, Alert, CircularProgress } from '@mui/material'
import UserForm from '../components/UserForm'
import { useUserForm } from '../hooks/useUserForm'
import apiService from '../services/apiService'
import './App.css'

function App() {
  const [sectors, setSectors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    formData,
    selectedSectors,
    validationErrors,
    isSubmitting,
    successMessage,
    isEditing,
    currentUserId,
    handleInputChange,
    handleSectorChange,
    handleSubmit,
    fetchUserData
  } = useUserForm(sectors)

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await apiService.getSectors()
        setSectors(data)
      } catch (err) {
        setError('Failed to load sectors. Please try again later.')
        console.error('Error fetching sectors:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSectors()
  }, [])

  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress size={60} />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="error-container">
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <div className="app-container">
      <Container maxWidth="md" className="app-content">
        {successMessage && (
          <Alert severity="success" className="success-message">
            {successMessage}
          </Alert>
        )}

        <UserForm
          formData={formData}
          selectedSectors={selectedSectors}
          sectors={sectors}
          validationErrors={validationErrors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onSectorChange={handleSectorChange}
          onSubmit={handleSubmit}
        />
      </Container>
    </div>
  )
}

export default App 