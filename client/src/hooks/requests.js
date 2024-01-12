const URL = "http://localhost:8000";

async function httpGetPlanets() {
  try {
    const response = await fetch(`${URL}/planets`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  try {
    const response = await fetch(`${URL}/launches`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  try {
    return await fetch(`${URL}/launches`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
