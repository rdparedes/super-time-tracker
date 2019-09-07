const TIME_ENTRIES_URL = 'time-entries';

export async function getTimeEntries() {
  try {
    const response = await (await fetch(TIME_ENTRIES_URL)).json();
    return response;
  } catch (error) {
    console.error(error);
  }
}
