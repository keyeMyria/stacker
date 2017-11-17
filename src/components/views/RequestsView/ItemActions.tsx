import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'

import { RequestStatus } from '../../../stores/interfaces/PalletRequest'

interface Props {
    status: RequestStatus,
    deliver: () => void
}

const ItemActions: React.SFC<Props> = (props) => {
    if(props.status === 'requested') {
        return(
            <Button
                raised
                color="primary"
                onClick={props.deliver}
            >
                Dorucit
            </Button>
        )
    } else {
        return null
    }
}

export default observer(ItemActions)