import { Link } from "@inertiajs/react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const ControlPanelComponent = ({title}) => {
    console.log(title);
    const state = {
        wika: false,
        swagelo: false,
        hylok: false,
        hy_lok: false,
        fluidLine: false
    }

    const [checkDisabled, setCheckDisabled] = useState(state);

    useEffect(() => {
        switch (title) {
            case 'wika':
                setCheckDisabled({...checkDisabled, wika: true})
                break;
            case 'swagelo':
                setCheckDisabled({...checkDisabled, swagelo: true})
                break;
            case 'hylok':
                setCheckDisabled({...checkDisabled, hylok: true})
                break;
            case 'hy-lok':
                setCheckDisabled({...checkDisabled, hy_lok: true})
                break;
            case 'fluidLine':
                setCheckDisabled({...checkDisabled, fluidLine: true})
                break;
        
            default:
                break;
        }
    }, [title])

    return (
        <Grid container sx={{padding: '10px'}}>
            <Grid item xs={12}>
                <ButtonGroup color="info" variant="contained" size="large" aria-label="Large button group">
                    <Link href={route('wika')}>
                        <Button disabled={checkDisabled.wika}>Wika</Button>
                    </Link>
                    <Link href={route('swagelo')}>
                        <Button disabled={checkDisabled.swagelo}>Swagelo</Button>
                    </Link>
                    <Link href={route('hylok')}>
                        <Button disabled={checkDisabled.hylok}>Hylok</Button>
                    </Link>
                    <Link href={route('hy-lok')}>
                        <Button disabled={checkDisabled.hy_lok}>Hy-lok</Button>
                    </Link>
                    <Link href={route('fluidLine')}>
                        <Button disabled={checkDisabled.fluidLine}>fluidLine</Button>
                    </Link>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default ControlPanelComponent;