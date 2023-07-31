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

  let totalCount = 60,
    landCount = 25,
    turn = 0

  $: landProbs = Array.from({ length: turn + 8 }, (_, i) => i).map((lands) => ({
    lands,
    exact:
      hyp(lands, turn + 7, landCount, totalCount) -
      (lands === 0
        ? 0
        : hyp(lands - 1, turn + 7, landCount, totalCount)),
    cum: 1 - (lands === 0
        ? 0
        : hyp(lands - 1, turn + 7, landCount, totalCount))
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

<div style="width: fit-content; max-width:700px; margin: 0.5rem 1rem;">
  <div class="row">
    <div class="col">
      <label for="other_count">Total Cards:</label><br/>
      <input bind:value={totalCount} type="number" id="other_count" class="w-100" />
    </div>
    <div class="col">
      <label for="land_count">Lands:</label><br/>
       <input bind:value={landCount} type="number" id="land_count" class="w-100" />
    </div>
  </div>
  <div class="my-2 w-50">
    <label for="turn">Turn:&nbsp;</label><input bind:value={turn} type="number" />
  </div>
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
      <tr>
        <td><em>Number of lands drawn</em></td>
        <td><em>Chance of drawing exactly this many lands</em></td>
        <td><em>Chance of drawing this many lands or more</em></td>
      </tr>
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
