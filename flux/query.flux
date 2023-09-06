from(bucket: "admin")
    |> range(start: -30m)
    |> filter(fn: (r) => r._measurement == "measurement1")