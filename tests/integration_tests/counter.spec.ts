import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Counter Integration', () => {
  test('should increment the count and persist to Turso', async ({ page }) => {
    // 1. Arrange: Go to the page
    await page.goto('http://localhost:5173/');

    // Get the initial count value from the UI
    // Assuming your count is wrapped in an element with an id or test-id
    const counterValue = page.getByTestId('count-display');
    const initialText = await counterValue.innerText();
    const initialCount = parseInt(initialText);

    // 2. Act: Click the increment button
    const button = page.getByRole('button', { name: '+1' });
    await button.click();

    // 3. Assert: Check if the UI updates to initialCount + 1
    // Playwright will retry this assertion until it passes or timeouts
    await expect(counterValue).toHaveText((initialCount + 1).toString());

    // 4. Verification: Refresh the page to ensure it actually saved to Turso
    await page.reload();
    await expect(counterValue).toHaveText((initialCount + 1).toString());

    // 5. Verify that the last_clicked timestamp is updated (optional, if you display it in the UI)
    const lastClicked = page.getByTestId('last-clicked');
    await expect(lastClicked).toHaveText(
      /Last: \d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/
    );
  });
});

test('should increment the count when the Space key is pressed', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/');

  // 1. FORCED FOCUS: Click the body of the page to make sure the window is active
  await page.locator('body').click();

  const counterValue = page.getByTestId('count-display');
  const initialCount = parseInt(await counterValue.innerText());

  // 2. ACT: Use the specific Key name
  // Using .down and .up is more reliable for window listeners than .press
  await page.keyboard.down('Space');
  await page.keyboard.up('Space');

  // 3. ASSERT: Wait for the UI to catch up
  await expect(counterValue).toHaveText((initialCount + 1).toString());

  await page.reload();
  await expect(counterValue).toHaveText((initialCount + 1).toString());
});
