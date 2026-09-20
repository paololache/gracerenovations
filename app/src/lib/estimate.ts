import { services, type Service } from '../data/services'

export type ProjectSize = 'small' | 'medium' | 'large'
export type ProjectScope = 'cosmetic' | 'full-gut' | 'structural'

const SIZE_MULTIPLIER: Record<ProjectSize, number> = {
  small: 0.7,
  medium: 1,
  large: 1.4,
}

const SCOPE_MULTIPLIER: Record<ProjectScope, number> = {
  cosmetic: 0.75,
  'full-gut': 1,
  structural: 1.3,
}

const roundTo500 = (n: number) => Math.round(n / 500) * 500

export function estimateRange(serviceId: Service['id'], size: ProjectSize, scope: ProjectScope): [number, number] {
  const service = services.find((s) => s.id === serviceId)
  if (!service) throw new Error(`Unknown service: ${serviceId}`)
  const multiplier = SIZE_MULTIPLIER[size] * SCOPE_MULTIPLIER[scope]
  const [min, max] = service.priceRange
  return [roundTo500(min * multiplier), roundTo500(max * multiplier)]
}

export function formatCurrency(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`
  return `$${n}`
}
