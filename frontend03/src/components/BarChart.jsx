import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const DummyBarChart = ({ bar }) => {

    return (
        <div style={{ width: '100%', height: '550px' }}>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={bar?.map(entry => entry.priceRange)}
                    tickFormat={bar?.map(entry => entry.priceRange)}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => tick}
                />
                <VictoryBar
                    data={bar}
                    x="priceRange"
                    y="count"
                />
            </VictoryChart>
        </div>
    );
};

export default DummyBarChart;
