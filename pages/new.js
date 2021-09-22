import { useState, useEffect } from 'react'
import { Container, Grid, Box } from '@theme-ui/components'
import Header from '../components/header'
import Field from '../components/field'
import EventCard from '../components/event-card'

export default () => {
  const [fields, setFields] = useState({
    email: '',
    website: '',
    name: 'My Hackathon',
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
    parsed_city: '',
    parsed_state_code: '',
    parsed_country: '',
    parsed_country_code: '',
    hackclub_affiliated: false,
    mlh_associated: false,
    banner: '',
    logo: '',
    expected_hackers: 0
  })
  const onChange = ({ target }) => {
    let { value } = target
    if (target.type === 'checkbox') value = Boolean(value)
    setFields(data => ({ ...data, [target.id]: value }))
  }
  useEffect(() => console.log(fields), [fields]) // for debugging

  return [
    <Header
      title="Submit your event"
      desc="Fill out your event’s details & we’ll get back to you within 2 days."
      key="header"
    />,
    <Container
      sx={{
        px: [3, 4],
        mt: [4, 5],
        display: 'grid',
        gridGap: [4, 5],
        gridTemplateColumns: [null, '3fr 2fr'],
        alignItems: 'start'
      }}
    >
      <Grid columns={[null, 2]} gap={[3, 4]}>
        <Field
          label="Your email address"
          name="email"
          type="email"
          desc="If we have any questions about your event, we’ll get in touch through this email."
          value={fields.email}
          onChange={onChange}
        />
        <Field
          label="Name of the hackathon"
          name="name"
          desc="(NOT your name, but the name of your event)"
          value={fields.name}
          onChange={onChange}
        />
        <Field
          label="Start date"
          type="date"
          name="start"
          value={fields.start}
          onChange={onChange}
          half
        />
        <Field
          label="End date"
          type="date"
          name="end"
          value={fields.end}
          onChange={onChange}
          half
        />
        <Field
          label="How many hackers you’re expecting"
          name="expected_hackers"
          type="number"
          value={fields.expected_hackers}
          onChange={onChange}
          placeholder={50}
          half
        />
        <Field
          label="Is this an online event?"
          name="virtual"
          type="checkbox"
          value={fields.virtual}
          onChange={onChange}
          half
        />
        <Field
          label="City where it’s being held (skip this if your event is online)"
          name="parsed_city"
          value={fields.parsed_city}
          onChange={onChange}
          half
        />
        <Field
          label="State, region, or territory (skip this if your event is online)"
          name="parsed_state"
          value={fields.parsed_state}
          onChange={onChange}
          half
        />
        <Field
          label="Country (skip this if your event is online)"
          name="parsed_country"
          placeholder="USA"
          value={fields.parsed_country}
          onChange={onChange}
          half
        />
        <Field
          label="Website"
          name="website"
          type="url"
          value={fields.website}
          onChange={onChange}
          placeholder="https://myhackathon.com"
        />
        <Field
          label="Are you affiliated with a registered Hack&nbsp;Club or Hack&nbsp;Club Bank?"
          name="hackclub_affiliated"
          type="checkbox"
          value={fields.hackclub_affiliated}
          onChange={onChange}
          half
        />
        <Field
          label="Are you a registered MLH member event?"
          name="mlh_associated"
          type="checkbox"
          value={fields.mlh_associated}
          onChange={onChange}
          half
        />
        <Field 
            label="Please attach a logo for your event card"
            name="logo"
            type="file"
            accept="image/*"
            value={fields.logo}
            onChange={onChange}
        />
        <Field 
            label="Please attach a background image for your event card"
            name="banner"
            type="file"
            accept="image/*"
            value={fields.banner}
            onChange={onChange}
        />
      </Grid>
      <Box sx={{ gridRow: [-1, 'auto'] }}>
        <EventCard {...fields} logo={extractFilename(fields.logo)} banner={extractFilename(fields.banner)} />
      </Box>
    </Container>
  ]
}

function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
      return path.substr(x+1);
    return path; // just the filename
  }