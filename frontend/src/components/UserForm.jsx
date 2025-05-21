import { Box, TextField, Button, FormControlLabel, Checkbox, Typography, Alert } from '@mui/material'
import SectorSelector from './SectorSelector'

const UserForm = ({
  formData,
  selectedSectors,
  sectors,
  validationErrors,
  isSubmitting,
  onInputChange,
  onSectorChange,
  onSubmit
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {formData.id ? 'Edit User Information' : 'User Information'}
      </Typography>

      {validationErrors.general && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validationErrors.general}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        error={!!validationErrors.name}
        helperText={validationErrors.name}
        sx={{ mb: 4 }}
        inputProps={{ style: { fontSize: '1.25rem' } }}
        InputLabelProps={{ style: { fontSize: '1.25rem' } }}
      />

      <SectorSelector
        sectors={sectors}
        selectedSectors={selectedSectors}
        onSectorChange={onSectorChange}
      />

      {validationErrors.sectors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validationErrors.sectors}
        </Alert>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreed_to_terms}
            onChange={onInputChange}
            name="agreed_to_terms"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
        }
        label={
          <Typography sx={{ fontSize: '1.25rem' }}>
            I agree to the terms and conditions
          </Typography>
        }
        sx={{ mb: 4 }}
      />

      {validationErrors.agreed_to_terms && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validationErrors.agreed_to_terms}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{
          py: 2,
          fontSize: '1.25rem',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        {isSubmitting ? 'Saving...' : formData.id ? 'Update' : 'Save'}
      </Button>
    </Box>
  )
}

export default UserForm 