const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Set up InfluxDB client
const token = 'GUTJWH-2n4kSX6DH1hj6n9b6mCCqadcyXWgTTqCP9uItzyUOyemYtQm8f-NyKruuDbmTRqxOsW0iMOBAQTTi2w==';
const org = 'Youtube';
const bucket = 'TestStorage';
const client = new InfluxDB({ url: 'http://localhost:8086', token });

const writeApi = client.getWriteApi(org, bucket)
/**
 * Create a point and write it to the buffer.
 **/
const point1 = new Point('temperature')
  .tag('sensor_id', 'TLM01')
  .floatField('value', 24.0)
console.log(` ${point1}`)

const point2 = new Point('pressure')
  .tag('sensor_id', 'P1')
  .floatField('value', 1000)
console.log(` ${point2}`)

writeApi.writePoint(point1)
writeApi.writePoint(point2)

/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
  console.log('WRITE FINISHED')
})


const queryApi = client.getQueryApi(org)
const fluxQuery =`from(bucket: "TestStorage")
    |> range(start: 0)
    |> filter(fn: (r) => r._measurement == "pressure")`

    const myQuery = async () => {
        for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
          const o = tableMeta.toObject(values)
          console.log(
            `${o._time} ${o._measurement} (${o.sensor_id}): ${o._field}=${o._value}`
          )
        }
      }
      
      /** Execute a query and receive line table metadata and rows. */
      myQuery()