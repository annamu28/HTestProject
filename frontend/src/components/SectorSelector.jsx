import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SectorSelector = ({ sectors, selectedSectors, onSectorChange }) => {
  const getSectorsByLevel = (level, parentValue = null) => {
    return sectors.filter(sector => 
      sector.level === level && 
      (parentValue === null ? sector.parent_value === null : sector.parent_value === parentValue)
    )
  }

  const renderSectorDropdown = (level, parentValue = null) => {
    const levelSectors = getSectorsByLevel(level, parentValue)
    if (levelSectors.length === 0) return null

    const selectedSector = selectedSectors.find(s => s.level === level)

    return (
      <FormControl fullWidth key={level} sx={{ mb: 4 }}>
        <InputLabel id={`sector-${level}-label`} sx={{ fontSize: '1.25rem' }}>
          {level === 1 ? 'Main Sector' : `Sub-sector Level ${level}`}
        </InputLabel>
        <Select
          labelId={`sector-${level}-label`}
          value={selectedSector?.value || ''}
          onChange={(e) => onSectorChange(level, e.target.value)}
          label={level === 1 ? 'Main Sector' : `Sub-sector Level ${level}`}
          sx={{ 
            fontSize: '1.25rem',
            '& .MuiSelect-select': {
              py: 2
            }
          }}
        >
          <MenuItem value="">
            <em>Select a sector</em>
          </MenuItem>
          {levelSectors.map(sector => (
            <MenuItem 
              key={sector.value} 
              value={sector.value}
              sx={{ fontSize: '1.25rem' }}
            >
              {sector.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  const renderSectorDropdowns = () => {
    const dropdowns = []
    let currentParentValue = null

    // Display current selection if any
    if (selectedSectors.length > 0) {
      const lastSector = selectedSectors[selectedSectors.length - 1]
      dropdowns.push(
        <Box key="current-selection" sx={{ mb: 2, width: '100%' }}>
          <Typography variant="subtitle1" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
            Currently selected: <strong>{lastSector.name}</strong>
          </Typography>
        </Box>
      )
    }

    // Render up to 4 levels of dropdowns
    for (let level = 1; level <= 4; level++) {
      const dropdown = renderSectorDropdown(level, currentParentValue)
      if (!dropdown) break
      
      dropdowns.push(dropdown)
      const selectedSector = selectedSectors.find(s => s.level === level)
      if (selectedSector) {
        currentParentValue = selectedSector.value
      } else {
        break
      }
    }

    return dropdowns
  }

  return (
    <Box sx={{ mb: 4, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontSize: '1.25rem' }} align="center">
        Sectors
      </Typography>
      {renderSectorDropdowns()}
    </Box>
  )
}

export default SectorSelector 