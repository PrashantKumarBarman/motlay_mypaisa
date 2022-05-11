import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Seats({ col, row, handleSelection, seats, seatsMap, selfBookedSeats }) {
    return (
        <Grid container sx={{ maxHeight: '92%', overflow: 'scroll', m: 1 }}>
            <Grid item md={4}>
                <LeftSide col={col} row={row} handleSelection={handleSelection} seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats} />
            </Grid>
            <Grid item md={4}>
            </Grid>
            <Grid item md={4}>
                <RightSide col={col} row={row} handleSelection={handleSelection} seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats} />
            </Grid>
        </Grid>
    );
}

function LeftSide({ col, row, handleSelection, seats, seatsMap, selfBookedSeats }) {
    return (
        <BusSide start={1} col={col} row={row} handleSelection={handleSelection}  seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats}/>
    )
}

function RightSide({ col, row, handleSelection, seats, seatsMap, selfBookedSeats }) {
    return (
        <BusSide start={1 + col} col={col} row={row} handleSelection={handleSelection} seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats} />
    )
}

function BusSide({ start, col, row, handleSelection, seats, seatsMap, selfBookedSeats }) {
    let rows = [];
    let seatNo = start;
    for(let i = 1; i <= row; i++) {
        let columns = [];
        for(let j = 1; j <= col; j++) {
            columns.push(<Seat seatNo={seatNo} handleSelection={handleSelection} seats={seats} seatsMap={seatsMap} selfBookedSeats={selfBookedSeats} />);
            seatNo++;
        }
        rows.push(
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                {columns}
            </Grid>
        )
        seatNo += col;
    }
    return rows;
}

function Seat({ seatNo, handleSelection, seats, seatsMap, selfBookedSeats }) {
    let color = null;
    let disabled = false;
    let variant = 'outlined';
    if(selfBookedSeats.includes(seatNo)) {
        disabled = true;
        variant = 'contained';
    }
    else if(seatsMap[seatNo]) {
        disabled = true;
        variant = 'contained';
    }
    else if(seats.includes(seatNo)) {
        variant = 'contained';
    }

    return (
        <Grid item m={1}>
            {color &&
            <Button variant={variant} type='button' onClick={(e) => { e.preventDefault(); handleSelection(seatNo); }} disabled={disabled} color={color}>{seatNo}</Button>
            }

            {!color &&
            <Button variant={variant} type='button' onClick={(e) => { e.preventDefault(); handleSelection(seatNo); }} disabled={disabled}>{seatNo}</Button>
            }
        </Grid>
    );
}