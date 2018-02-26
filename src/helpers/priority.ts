import { Priority } from '../models/Request'

export const formatPriority = (priority: Priority): string => {
	switch (priority) {
		case 'urgent': return 'Urgentní'
		case 'high': return 'Vysoká'
		case 'standard': return 'Standardní'
		case 'low': return 'Nízká'
	}
}
