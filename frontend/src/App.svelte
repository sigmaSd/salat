<script lang="ts">
  import Salat from "./lib/Salat.svelte";
  import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

  let onlineTimesPromise: Promise<Record<string, string>> = fetch(
    "/api/2023-04-02/342/615"
  )
    .then((r) => r.json())
    .then((r) => r.data);

  let offlineTimesPromise = (() => {
    return new Promise((resolve) => {
      const params = CalculationMethod.MuslimWorldLeague();
      const date = new Date();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = new Coordinates(latitude, longitude);
          resolve(new PrayerTimes(coordinates, date, params));
        },
        (_error) => {
          const coordinates = new Coordinates(36.8, 10.18); // Tunis Tunis
          resolve(new PrayerTimes(coordinates, date, params));
        }
      );
    });
  })();
</script>

<main>
  <div>
    {#await onlineTimesPromise then onlineTimes}
      <h1>{new Date().toUTCString()}</h1>
      {#if onlineTimes}
        {#each Object.entries(onlineTimes) as [name, time]}
          {#if name.startsWith("sobh") || name.startsWith("dhohr") || name.startsWith("aser") || name.startsWith("magreb") || name.startsWith("isha")}
            <Salat {name} {time} />
          {/if}
        {/each}
      {:else}
        {#await offlineTimesPromise then offlineTimes}
          {#each Object.entries(offlineTimes) as [name, time]}
            {#if name.startsWith("fajr") || name.startsWith("dhuhr") || name.startsWith("asr") || name.startsWith("maghrib") || name.startsWith("isha")}
              <Salat {name} time={time.toLocaleTimeString()} />
            {/if}
          {/each}
        {/await}
      {/if}
    {/await}
  </div>
</main>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 34px;
    font-family: monospace;
    font-weight: normal;
    color: #00a;
  }
</style>
