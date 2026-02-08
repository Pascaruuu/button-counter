<script lang="ts">
    let { value }: { value: number } = $props();

    // Configuration: How many zeros to show (e.g. 00000015)
    const DIGIT_COUNT = 9; 

    // Transform number into an array of digits: 15 -> ['0','0',...'1','5']
    let digits = $derived(
        Math.abs(value).toString().padStart(DIGIT_COUNT, '0').split('')
    );
</script>

<div class="odometer-container">
    {#each digits as digit, i (i)}
        <div class="digit-window">
            <div 
                class="digit-tape" 
                style="transform: translateY(-{parseInt(digit) * 10}%);"
            >
                {#each Array(10) as _, num}
                    <div class="number">{num}</div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .odometer-container {
        display: inline-flex;
        background: #222;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: inset 0 2px 10px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3);
        overflow: hidden; /* Hides the numbers that are "off screen" */
    }

    .digit-window {
        width: 3rem;  /* Width of one number */
        height: 4rem; /* Height of one number */
        position: relative;
        overflow: hidden; /* Critical: Creates the "window" effect */
        border-right: 1px solid #333;
    }

    .digit-window:last-child {
        border-right: none;
    }

    .digit-tape {
        display: flex;
        flex-direction: column;
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy spring effect */
        height: 1000%; /* 10 numbers * 100% height each */
    }

    .number {
        height: 10%; /* 1/10th of the tape */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-family: 'Courier New', monospace; /* Monospace is safer for alignment */
        font-weight: bold;
        color: #fff;
        background: linear-gradient(180deg, #333 0%, #222 50%, #333 100%);
    }
</style>