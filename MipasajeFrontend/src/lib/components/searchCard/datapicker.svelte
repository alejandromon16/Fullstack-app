
    <script>
        let month = new Date().getMonth()
        let year = new Date().getFullYear

        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }


        let numberOfDays = daysInMonth(month+1, 2022, 0); // 31
    </script>
    
    <div class="flex bg-white shadow-lg rounded-xl font-mn">
      <div class="flex flex-col">
        <div class="flex divide-x">
          <div class="flex flex-col px-6 pt-5 pb-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <button
                class="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50"
              >
                <svg class="w-6 h-6 text-gray-900 stroke-current" fill="none">
                  <path
                    d="M13.25 8.75L9.75 12l3.5 3.25"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div class="text-sm font-semibold">{month}</div>
              <button
                class="flex items-center justify-center p-2 rounded-xl hover:bg-gray-50"
              >
                <svg class="w-6 h-6 text-gray-900 stroke-current" fill="none">
                  <path
                    d="M10.75 8.75l3.5 3.25-3.5 3.25"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-7 text-xs text-center text-gray-900">
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Mo
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Tu
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                We
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Th
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Fri
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Sa
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 font-semibold rounded-lg"
              >
                Su
              </span>
              {#each Array(numberOfDays) as _,i}
                <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
                >
                    {i+1}
                </span>
              {/each}  
              
             
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                1
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                2
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                3
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                4
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                5
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                6
              </span>
              <span
                class="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg"
              >
                7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>