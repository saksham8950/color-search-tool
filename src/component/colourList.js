import React from "react";
import convert from "color-convert";

const ColourList = ({ colours }) => {
  return (
    <>
      <div className="color-list-wrapper">
        <table>
          <tr align="left">
            <th></th>
            <th>Name</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>HSL</th>
          </tr>
          {colours.map((c) => {
            const rgb = convert.hex.rgb(c.hex);
            const hsl = convert.hex.hsl(c.hex);
            return (
              <tr key={c.hex} align="left">
                <td
                  className="color-palette"
                  style={{ background: c.hex }}
                ></td>
                <td>{c.color}</td>
                <td>{c.hex}</td>
                <td>{rgb.join(", ")}</td>
                <td>{hsl.join(", ")}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ColourList;
