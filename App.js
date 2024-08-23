import React, { useState } from 'react';

function Form() {
  const [cities, setCities] = useState([
    {
      name: '',
      suburbs: [
        {
          name: '',
          state: 'QLD',
          postalCodeType: 'single',
          postalCodes: '',
          deliveryCosts: {
            fixed: {
              thresholds: [{ amount: '', cost: '' }],
              above_threshold: ''
            }
          },
          pickupOptions: {
            thresholds: [{ amount: '', cost: '' }],
            above_threshold: ''
          }
        }
      ]
    }
  ]);

  const addCity = () => {
    setCities([
      ...cities,
      {
        name: '',
        suburbs: [
          {
            name: '',
            state: 'QLD',
            postalCodeType: 'single',
            postalCodes: '',
            deliveryCosts: {
              fixed: {
                thresholds: [{ amount: '', cost: '' }],
                above_threshold: ''
              }
            },
            pickupOptions: {
              thresholds: [{ amount: '', cost: '' }],
              above_threshold: ''
            }
          }
        ]
      }
    ]);
  };

  const addThreshold = (cityIndex, suburbIndex, type) => {
    const newCities = [...cities];
    if (type === 'delivery') {
      newCities[cityIndex].suburbs[suburbIndex].deliveryCosts.fixed.thresholds.push({
        amount: '',
        cost: ''
      });
    } else {
      newCities[cityIndex].suburbs[suburbIndex].pickupOptions.thresholds.push({
        amount: '',
        cost: ''
      });
    }
    setCities(newCities);
  };

  const handleCityChange = (index, event) => {
    const newCities = [...cities];
    newCities[index].name = event.target.value;
    setCities(newCities);
  };

  const handleSuburbChange = (cityIndex, suburbIndex, field, event) => {
    const newCities = [...cities];
    newCities[cityIndex].suburbs[suburbIndex][field] = event.target.value;
    setCities(newCities);
  };

  const handleThresholdChange = (cityIndex, suburbIndex, thresholdIndex, field, value, type) => {
    const newCities = [...cities];
    if (type === 'delivery') {
      newCities[cityIndex].suburbs[suburbIndex].deliveryCosts.fixed.thresholds[thresholdIndex][field] = value;
    } else {
      newCities[cityIndex].suburbs[suburbIndex].pickupOptions.thresholds[thresholdIndex][field] = value;
    }
    setCities(newCities);
  };

  return (
    <div className="bg-gray-100 p-10">
      <form action="/submit-data" method="POST" className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">State Information</h2>
        <label htmlFor="stateName" className="block mb-2 font-semibold">State Name:</label>
        <select id="stateName" name="stateName" required className="border border-gray-300 p-2 w-full mb-4 rounded">
          <option value="">Select a State</option>
          <option value="QLD">Queensland</option>
          <option value="NSW">New South Wales</option>
          <option value="VIC">Victoria</option>
        </select>

        <h2 className="text-xl font-bold mb-4">City Information</h2>
        <div id="cityContainer">
          {cities.map((city, cityIndex) => (
            <div key={cityIndex} className="city border p-4 mb-4 rounded random-bg">
              <label htmlFor="cityName" className="block mb-2 font-semibold">City Name:</label>
              <select
                id="cityName"
                name={`cities[${cityIndex}][name]`}
                value={city.name}
                onChange={(e) => handleCityChange(cityIndex, e)}
                required
                className="border border-gray-300 p-2 w-full mb-4 rounded"
              >
                <option value="">Select a City</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
              </select>

              {city.suburbs.map((suburb, suburbIndex) => (
                <div key={suburbIndex} className="suburb border p-4 mb-4 rounded random-bg">
                  <label htmlFor="suburbName" className="block mb-2 font-semibold">Suburb Name:</label>
                  <input
                    type="text"
                    id="suburbName"
                    name={`cities[${cityIndex}][suburbs][${suburbIndex}][name]`}
                    value={suburb.name}
                    onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'name', e)}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  />

                  <label htmlFor="state" className="block mb-2 font-semibold">State:</label>
                  <input
                    type="text"
                    id="state"
                    name={`cities[${cityIndex}][suburbs][${suburbIndex}][state]`}
                    value={suburb.state}
                    onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'state', e)}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  />

                  <label htmlFor="postalCodeType" className="block mb-2 font-semibold">Postal Code Type:</label>
                  <select
                    id="postalCodeType"
                    name={`cities[${cityIndex}][suburbs][${suburbIndex}][postalCodeType]`}
                    value={suburb.postalCodeType}
                    onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'postalCodeType', e)}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  >
                    <option value="single">Single</option>
                    <option value="range">Range</option>
                    <option value="list">List</option>
                  </select>

                  <div id="postalCodeInput" className="mb-4">
                    <label htmlFor="postalCode" className="block mb-2 font-semibold">Postal Code:</label>
                    <input
                      type="text"
                      id="postalCode"
                      name={`cities[${cityIndex}][suburbs][${suburbIndex}][postalCodes]`}
                      value={suburb.postalCodes}
                      onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'postalCodes', e)}
                      required
                      className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                  </div>

                  <h4 className="text-lg font-semibold mb-2 bg-yellow-200 p-2 rounded">Delivery Costs</h4>
                  <div id="deliveryCosts" className="p-4 mb-4 bg-yellow-50 rounded">
                    {suburb.deliveryCosts.fixed.thresholds.map((threshold, thresholdIndex) => (
                      <div key={thresholdIndex} className="threshold mb-4">
                        <label htmlFor="thresholdAmount" className="block mb-2 font-semibold">Order Value Threshold:</label>
                        <input
                          type="number"
                          id="thresholdAmount"
                          name={`cities[${cityIndex}][suburbs][${suburbIndex}][delivery_costs][fixed][thresholds][${thresholdIndex}][amount]`}
                          value={threshold.amount}
                          onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, thresholdIndex, 'amount', e.target.value, 'delivery')}
                          required
                          className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />

                        <label htmlFor="costBelowThreshold" className="block mb-2 font-semibold">Cost Below Threshold:</label>
                        <input
                          type="number"
                          step="0.01"
                          id="costBelowThreshold"
                          name={`cities[${cityIndex}][suburbs][${suburbIndex}][delivery_costs][fixed][thresholds][${thresholdIndex}][cost]`}
                          value={threshold.cost}
                          onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, thresholdIndex, 'cost', e.target.value, 'delivery')}
                          required
                          className="border border-gray-300 p-2 w-full mb-4 rounded"
                        />

                        <button
                          type="button"
                          onClick={() => addThreshold(cityIndex, suburbIndex, 'delivery')}
                          className="text-blue-500"
                        >
                          Add Another Threshold
                        </button>
                      </div>
                    ))}

                    <label htmlFor="fixedAboveThreshold" className="block mb-2 font-semibold">Fixed Cost (Above Threshold):</label>
                    <input
                      type="number"
                      step="0.01"
                      id="fixedAboveThreshold"
                      name={`cities[${cityIndex}][suburbs][${suburbIndex}][delivery_costs][fixed][above_threshold]`}
                      value={suburb.deliveryCosts.fixed.above_threshold}
                      onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'deliveryCosts.fixed.above_threshold', e)}
                      required
                      className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                  </div>

                  <h4 className="text-lg font-semibold mb-2 bg-blue-200 p-2 rounded">Pickup Options</h4>
                  <div id="pickupOptions"   className="p-4 mb-4 bg-blue-50 rounded">
                    {suburb.pickupOptions.thresholds.map((threshold, thresholdIndex) => (
                      <div key={thresholdIndex} className="threshold mb-4">
                        <label htmlFor="pickupThresholdAmount" className="block mb-2 font-semibold">Order Value Threshold:</label>
                        <input
                          type="number"
                          id="pickupThresholdAmount"
                          name={`cities[${cityIndex}][suburbs][${suburbIndex}][pickup_options][thresholds][${thresholdIndex}][amount]`}
                          value={threshold.amount}
                          onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, thresholdIndex, 'amount', e.target.value, 'pickup')}
                          required
                          className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />

                        <label htmlFor="pickupCostBelowThreshold" className="block mb-2 font-semibold">Pickup Cost Below Threshold:</label>
                        <input
                          type="number"
                          step="0.01"
                          id="pickupCostBelowThreshold"
                          name={`cities[${cityIndex}][suburbs][${suburbIndex}][pickup_options][thresholds][${thresholdIndex}][cost]`}
                          value={threshold.cost}
                          onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, thresholdIndex, 'cost', e.target.value, 'pickup')}
                          required
                          className="border border-gray-300 p-2 w-full mb-4 rounded"
                        />

                        <button
                          type="button"
                          onClick={() => addThreshold(cityIndex, suburbIndex, 'pickup')}
                          className="text-blue-500"
                        >
                          Add Another Threshold
                        </button>
                      </div>
                    ))}

                    <label htmlFor="pickupAboveThreshold" className="block mb-2 font-semibold">Pickup Cost (Above Threshold):</label>
                    <input
                      type="number"
                      step="0.01"
                      id="pickupAboveThreshold"
                      name={`cities[${cityIndex}][suburbs][${suburbIndex}][pickup_options][above_threshold]`}
                      value={suburb.pickupOptions.above_threshold}
                      onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, 'pickupOptions.above_threshold', e)}
                      required
                      className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addCity}
          className="text-blue-500"
        >
          Add Another City
        </button><br /><br />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
