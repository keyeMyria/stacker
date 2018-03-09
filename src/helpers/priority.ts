import { Priority } from '../models/Request'
import { StatusName } from '../models/StatusChange'

export const formatPriority = (priority: Priority): string => {
	switch (priority) {
		case 'urgent': return 'Urgentní'
		case 'high': return 'Vysoká'
		case 'standard': return 'Standardní'
		case 'low': return 'Nízká'
	}
}

export const formatStatus = (status: StatusName): string => {
	switch (status) {
		case 'requested': return 'Zažádáno'
		case 'delivered': return 'Doručeno'
		case 'toReturn': return 'K vrácení'
		case 'completed': return 'Dokončeno'
		case 'cancelled': return 'Zrušeno'
	}
}
