import React, { Component } from 'react';
import './Palette.css';
class Palette extends Component {
    render() {
        const { colors, selected, onSelect} = this.props;

        const Color = ({ id, color, active, onClick }) => {
            console.log(id);

            return (
                <div className={`color ${active ? ' active' : ' false'}`} style={{ background: color }} onClick={() => onClick(id)}/>
            );
        }

        const Palette = colors.map(
            ({ id, color, selected}) => (
                <Color
                    id={id}
                    color={color}
                    active={selected}
                    onClick={onSelect}
                />
            )
        );

        return (
            <div className="palette">
                {Palette}
            </div>
        );
    }
}


export default Palette;