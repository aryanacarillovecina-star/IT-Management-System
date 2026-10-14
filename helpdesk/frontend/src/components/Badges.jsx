const slug = (s) => String(s).toLowerCase().replace(/\s+/g, '-')

export const PriorityBadge = ({ value }) => (
  <span className={`badge priority-${slug(value)}`}>{value}</span>
)

export const StatusBadge = ({ value }) => (
  <span className={`badge status-${slug(value)}`}>{value}</span>
)

export const formatDate = (d) =>
  new Date(d).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
