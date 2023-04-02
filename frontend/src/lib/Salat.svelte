<script lang="ts">
  export let name: string;
  export let time: string;
</script>

{#if name && time}
  <div>
    <p id="name">{name}</p>
    <p id="time">{time}</p>
  </div>
{/if}

<style>
  div {
    display: flex;
    gap: 1rem;
    font-size: 34px;
    height: 4rem;
  }
  #time {
    color: darkred;
    font-family: monospace;
  }
  #name {
    color: #00a;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
</style>
