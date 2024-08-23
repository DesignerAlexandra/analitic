import ControlPanelComponent from '@/Components/Compaigns/ControlPanelComponent';
import TableComponent from '@/Components/MUIComponents/Compaigns/TableComponent';
import Guest from '@/Layouts/GuestLayout';
import { Box, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


const sumProfitClient  = (clients) => {
    let sum = 0
    
    if(clients.lenght) {
        clients.forEach(client => {
            sum += Number(client.invoice_price) 
        });
    }

    return sum
} 

const sumValuesInData = (data) => {
    let values = {
        clientsIn1C: 0,
        sumClicks: 0,
        sumPriceForCompaign: 0,
        profitBy1C: 0
    }
    if(data) {
        for(let key in data) {            
            values.clientsIn1C += data[key].clients.length,
            values.sumClicks += data[key].clicks,
            values.sumPriceForCompaign += data[key].cost,
            values.profitBy1C = sumProfitClient(data[key].clients)
        }

        values = {
            ...values,
            clientsIn1C: values.clientsIn1C,
            sumClicks: values.sumClicks,
            sumPriceForCompaign: values.sumPriceForCompaign.toFixed(2),
            profitBy1C: values.profitBy1C.toFixed(2)
        }

        return values
    }

    return values
}

const Compaigns = ({data}) => {
    
    
    const [compaigns, setCompaigns] = useState([]);
    const [routePath, ] = useState(data.routePath);
    const [loader, setLoader] = useState(false);
    const [valueData, setValueData] = useState({
        clientsIn1C: 0,
        sumClicks: 0,
        sumPriceForCompaign: 0,
        profitBy1C: 0
    });

    const updateDirectDate = (date) => {
        setDateUpdate(date)
    }
    
    const fetchInvoice = () => {

        let routing = 'compaigns.wika.invoice'

        switch (routePath) {
            case 'wika':
                routing = 'compaigns.wika.invoice'
                break;

            case 'swagelo':
                routing = 'compaigns.swagelo.invoice'
                break;
                
            case 'hylok':
                routing = 'compaigns.hylok.invoice'
                break;

            case 'hy-lok':
                routing = 'compaigns.hy-lok.invoice'
                break;
        
            default:
                break;
        }

        axios.post(route(routing))
        .then(result => {
            console.log(result.data);
            
            setCompaigns(result.data.direct)
            setValueData(sumValuesInData(result.data.direct))       
            setLoader(true)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchInvoice()
    }, [])

    return (
        <Guest dateUpdateDirect={data.dateUpdateDirect} updateDirectDate={updateDirectDate}>
            <ControlPanelComponent title={data.routePath}/>
            <hr />
            <br/>
            <Grid container>
                <TableComponent compaignsData={compaigns}/>
            </Grid>
            <Grid container sx={{padding: '15px', border: 'solid black 1px'}}>
                <Grid item sx={{textAlign: 'center'}}  xs={4.5}>
                    ИТОГО: 
                </Grid>
                <Grid item sx={{textAlign: 'center'}} xs={1.9}>
                    {valueData.clientsIn1C}
                </Grid>
                <Grid item sx={{textAlign: 'center'}} xs={1.9}>
                    {valueData.sumClicks}
                </Grid>
                <Grid item sx={{textAlign: 'center'}} xs={1.9}>
                    {valueData.sumPriceForCompaign}
                </Grid>
                <Grid item sx={{textAlign: 'center'}} xs={1.8}>
                    {valueData.profitBy1C}
                </Grid>
            </Grid>
        </Guest>
    )
}

export default Compaigns