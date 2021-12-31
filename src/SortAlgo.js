const SortAlgos = [
  [
    {
      id: 1,
      name: "Bubble Sort",
      value: "BubbleSort",
      legends: ["Compare", "Swap", "Sorted"],
      worstCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      bestCase: <span>O(n)</span>,
      averageCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      spaceComplexity: <span>O(1)</span>,
      description: `, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. This simple algorithm performs poorly in real world use and is used primarily as an educational tool. `,
      wikiLink: "https://en.wikipedia.org/wiki/Bubble_sort",
    },
  ],
  [
    {
      id: 2,
      name: "Insertion Sort",
      value: "InsertionSort",
      legends: ["Compare", "Swap", "Sorted"],
      worstCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      bestCase: <span>O(n)</span>,
      averageCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      spaceComplexity: <span>O(1)</span>,
      description: ` is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. 
      It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. 
      However, insertion sort provides several advantages:`,
      wikiLink: "https://en.wikipedia.org/wiki/Insertion_sort",
    },
  ],
  [
    {
      id: 3,
      name: "Selection Sort",
      value: "SelectionSort",
      legends: ["Compare", "Swap", "Sorted"],
      worstCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      bestCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      averageCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      spaceComplexity: <span>O(1)</span>,
      description: ` is an in-place comparison sorting algorithm. 
      It has an O(n2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort. 
      Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.
      The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list. 
      Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, 
      exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.`,
      wikiLink: "https://en.wikipedia.org/wiki/Selection_sort",
    },
  ],
  [
    {
      id: 4,
      name: "Shell Sort",
      value: "ShellSort",
      legends: ["Compare", "Swap", "Sorted", "Gap"],
      worstCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      bestCase: <span>O(n log n)</span>,
      averageCase: (
        <span>
          O(n<sup>3/2</sup>)
        </span>
      ),
      spaceComplexity: <span>O(1)</span>,
      description: `, also known as Shell sort or Shell's method, is an in-place comparison sort. 
      It can be seen as either a generalization of sorting by exchange (bubble sort) or sorting by insertion (insertion sort). 
      The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. 
      By starting with far apart elements, it can move some out-of-place elements into position faster than a simple nearest neighbor exchange. 
      Donald Shell published the first version of this sort in 1959. The running time of Shellsort is heavily dependent on the gap sequence it uses. 
      For many practical variants, determining their time complexity remains an open problem.`,
      wikiLink: "https://en.wikipedia.org/wiki/Shellsort",
    },
  ],
  [
    {
      id: 5,
      name: "Quick Sort",
      value: "QuickSort",
      legends: ["Compare", "Swap", "Sorted", "Pivot"],
      worstCase: (
        <span>
          O(n<sup>2</sup>)
        </span>
      ),
      bestCase: <span>O(n log n)</span>,
      averageCase: <span>O(n log n)</span>,
      spaceComplexity: <span>O(log n)</span>,
      description: ` is an in-place sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, 
      it is still a commonly used algorithm for sorting. When implemented well, it can be somewhat faster than merge sort and about two or three times faster than heapsort.
      Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, 
      according to whether they are less than or greater than the pivot. For this reason, it is sometimes called partition-exchange sort.
      The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.
      Quicksort is a comparison sort, meaning that it can sort items of any type for which a "less-than" relation (formally, a total order) is defined. 
      Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved.`,
      wikiLink: "https://en.wikipedia.org/wiki/Quicksort",
    },
  ],
];

export default SortAlgos;
