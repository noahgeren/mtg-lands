<script lang="ts">
  // Returns P(X <= x | nn, m, n)
  function hyp(x, n, m, nn) {
    let nz = Math.min(m, n),
      mz = Math.max(m, n)
    let h = 1,
      s = 1,
      k = 0
    for (let i = 0; i < x; i++) {
      while (s > 1 && k < nz) {
        h = h * (1 - mz / (nn - k))
        s = s * (1 - mz / (nn - k))
        k = k + 1
      }
      h = (h * (nz - i) * (mz - i)) / (i + 1) / (nn - nz - mz + i + 1)
      s = s + h
    }
    while (k < nz) {
      s = s * (1 - mz / (nn - k))
      k = k + 1
    }
    return s
  }

  let otherCount = 40,
    landCount = 20,
    turn = 0

  $: landProbs = Array.from({ length: turn + 8 }, (_, i) => i).map((lands) => ({
    lands,
    exact:
      hyp(lands, turn + 7, landCount, landCount + otherCount) -
      (lands === 0
        ? 0
        : hyp(lands - 1, turn + 7, landCount, landCount + otherCount)),
    cum: 1 - (lands === 0
        ? 0
        : hyp(lands - 1, turn + 7, landCount, landCount + otherCount))
  }))
</script>

<style>
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
  }
</style>

<div style="width: fit-content;">
  <label for="other_count">Other Cards:</label>
  <input bind:value={otherCount} type="number" id="other_count" />
  <label for="land_count">Land Cards:</label>
  <input bind:value={landCount} type="number" id="landCount" />
  <br />
  <label for="turn">Turn: {turn}</label>
  <input
    bind:value={turn}
    type="range"
    id="turn"
    min="0"
    max="20"
    style="width: 100%;" />
  <table>
    <thead>
      <tr>
        <th>Lands</th>
        <th>Exact probability  P(N = k)</th>
        <th>Cumulative Probability  P(N >= k)</th>
      </tr>
    </thead>
    <tbody>
      {#each landProbs as prob}
        <tr>
          <td>{prob.lands}</td>
          <td>{Math.round(prob.exact * 10000) / 100}%</td>
          <td>{Math.round(prob.cum * 10000) / 100}%</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
