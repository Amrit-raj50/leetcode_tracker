const problemsData = [
    { id: 1, title: "Two Sum", url: "https://leetcode.com/problems/two-sum" },
    { id: 2, title: "Palindrome Number", url: "https://leetcode.com/problems/palindrome-number" },
    { id: 3, title: "Roman to Integer", url: "https://leetcode.com/problems/roman-to-integer" },
    { id: 4, title: "Longest Common Prefix", url: "https://leetcode.com/problems/longest-common-prefix" },
    { id: 5, title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses" },
    { id: 6, title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists" },
    { id: 7, title: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array" },
    { id: 8, title: "Remove Element", url: "https://leetcode.com/problems/remove-element" },
    { id: 9, title: "Find the Index of the First Occurrence in a String", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string" },
    { id: 10, title: "Search Insert Position", url: "https://leetcode.com/problems/search-insert-position" },
    { id: 11, title: "Length of Last Word", url: "https://leetcode.com/problems/length-of-last-word" },
    { id: 12, title: "Plus One", url: "https://leetcode.com/problems/plus-one" },
    { id: 13, title: "Add Binary", url: "https://leetcode.com/problems/add-binary" },
    { id: 14, title: "Sqrt(x)", url: "https://leetcode.com/problems/sqrtx" },
    { id: 15, title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs" },
    { id: 16, title: "Remove Duplicates from Sorted List", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list" },
    { id: 17, title: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array" },
    { id: 18, title: "Binary Tree Inorder Traversal", url: "https://leetcode.com/problems/binary-tree-inorder-traversal" },
    { id: 19, title: "Same Tree", url: "https://leetcode.com/problems/same-tree" },
    { id: 20, title: "Symmetric Tree", url: "https://leetcode.com/problems/symmetric-tree" },
    { id: 21, title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
    { id: 22, title: "Convert Sorted Array to Binary Search Tree", url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree" },
    { id: 23, title: "Balanced Binary Tree", url: "https://leetcode.com/problems/balanced-binary-tree" },
    { id: 24, title: "Minimum Depth of Binary Tree", url: "https://leetcode.com/problems/minimum-depth-of-binary-tree" },
    { id: 25, title: "Path Sum", url: "https://leetcode.com/problems/path-sum" },
    { id: 26, title: "Pascal's Triangle", url: "https://leetcode.com/problems/pascals-triangle" },
    { id: 27, title: "Pascal's Triangle II", url: "https://leetcode.com/problems/pascals-triangle-ii" },
    { id: 28, title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock" },
    { id: 29, title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome" },
    { id: 30, title: "Single Number", url: "https://leetcode.com/problems/single-number" },
    { id: 31, title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle" },
    { id: 32, title: "Binary Tree Preorder Traversal", url: "https://leetcode.com/problems/binary-tree-preorder-traversal" },
    { id: 33, title: "Binary Tree Postorder Traversal", url: "https://leetcode.com/problems/binary-tree-postorder-traversal" },
    { id: 34, title: "Min Stack", url: "https://leetcode.com/problems/min-stack" },
    { id: 35, title: "Intersection of Two Linked Lists", url: "https://leetcode.com/problems/intersection-of-two-linked-lists" },
    { id: 36, title: "Missing Ranges", url: "https://leetcode.com/problems/missing-ranges" },
    { id: 37, title: "Excel Sheet Column Title", url: "https://leetcode.com/problems/excel-sheet-column-title" },
    { id: 38, title: "Majority Element", url: "https://leetcode.com/problems/majority-element" },
    { id: 39, title: "Two Sum III - Data structure design", url: "https://leetcode.com/problems/two-sum-iii-data-structure-design" },
    { id: 40, title: "Excel Sheet Column Number", url: "https://leetcode.com/problems/excel-sheet-column-number" },
    { id: 41, title: "Combine Two Tables", url: "https://leetcode.com/problems/combine-two-tables" },
    { id: 42, title: "Employees Earning More Than Their Managers", url: "https://leetcode.com/problems/employees-earning-more-than-their-managers" },
    { id: 43, title: "Duplicate Emails", url: "https://leetcode.com/problems/duplicate-emails" },
    { id: 44, title: "Customers Who Never Order", url: "https://leetcode.com/problems/customers-who-never-order" },
    { id: 45, title: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits" },
    { id: 46, title: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits" },
    { id: 47, title: "Valid Phone Numbers", url: "https://leetcode.com/problems/valid-phone-numbers" },
    { id: 48, title: "Tenth Line", url: "https://leetcode.com/problems/tenth-line" },
    { id: 49, title: "Delete Duplicate Emails", url: "https://leetcode.com/problems/delete-duplicate-emails" },
    { id: 50, title: "Rising Temperature", url: "https://leetcode.com/problems/rising-temperature" },
    { id: 51, title: "Happy Number", url: "https://leetcode.com/problems/happy-number" },
    { id: 52, title: "Remove Linked List Elements", url: "https://leetcode.com/problems/remove-linked-list-elements" },
    { id: 53, title: "Isomorphic Strings", url: "https://leetcode.com/problems/isomorphic-strings" },
    { id: 54, title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list" },
    { id: 55, title: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate" },
    { id: 56, title: "Contains Duplicate II", url: "https://leetcode.com/problems/contains-duplicate-ii" },
    { id: 57, title: "Count Complete Tree Nodes", url: "https://leetcode.com/problems/count-complete-tree-nodes" },
    { id: 58, title: "Implement Stack using Queues", url: "https://leetcode.com/problems/implement-stack-using-queues" },
    { id: 59, title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree" },
    { id: 60, title: "Summary Ranges", url: "https://leetcode.com/problems/summary-ranges" },
    { id: 61, title: "Power of Two", url: "https://leetcode.com/problems/power-of-two" },
    { id: 62, title: "Implement Queue using Stacks", url: "https://leetcode.com/problems/implement-queue-using-stacks" },
    { id: 63, title: "Palindrome Linked List", url: "https://leetcode.com/problems/palindrome-linked-list" },
    { id: 64, title: "Lowest Common Ancestor of a Binary Search Tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree" },
    { id: 65, title: "Delete Node in a Linked List", url: "https://leetcode.com/problems/delete-node-in-a-linked-list" },
    { id: 66, title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram" },
    { id: 67, title: "Shortest Word Distance", url: "https://leetcode.com/problems/shortest-word-distance" },
    { id: 68, title: "Strobogrammatic Number", url: "https://leetcode.com/problems/strobogrammatic-number" },
    { id: 69, title: "Meeting Rooms", url: "https://leetcode.com/problems/meeting-rooms" },
    { id: 70, title: "Binary Tree Paths", url: "https://leetcode.com/problems/binary-tree-paths" },
    { id: 71, title: "Add Digits", url: "https://leetcode.com/problems/add-digits" },
    { id: 72, title: "Ugly Number", url: "https://leetcode.com/problems/ugly-number" },
    { id: 73, title: "Palindrome Permutation", url: "https://leetcode.com/problems/palindrome-permutation" },
    { id: 74, title: "Missing Number", url: "https://leetcode.com/problems/missing-number" },
    { id: 75, title: "Closest Binary Search Tree Value", url: "https://leetcode.com/problems/closest-binary-search-tree-value" },
    { id: 76, title: "First Bad Version", url: "https://leetcode.com/problems/first-bad-version" },
    { id: 77, title: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes" },
    { id: 78, title: "Word Pattern", url: "https://leetcode.com/problems/word-pattern" },
    { id: 79, title: "Nim Game", url: "https://leetcode.com/problems/nim-game" },
    { id: 80, title: "Flip Game", url: "https://leetcode.com/problems/flip-game" },
    { id: 81, title: "Range Sum Query - Immutable", url: "https://leetcode.com/problems/range-sum-query-immutable" },
    { id: 82, title: "Power of Three", url: "https://leetcode.com/problems/power-of-three" },
    { id: 83, title: "Counting Bits", url: "https://leetcode.com/problems/counting-bits" },
    { id: 84, title: "Power of Four", url: "https://leetcode.com/problems/power-of-four" },
    { id: 85, title: "Reverse String", url: "https://leetcode.com/problems/reverse-string" },
    { id: 86, title: "Reverse Vowels of a String", url: "https://leetcode.com/problems/reverse-vowels-of-a-string" },
    { id: 87, title: "Moving Average from Data Stream", url: "https://leetcode.com/problems/moving-average-from-data-stream" },
    { id: 88, title: "Intersection of Two Arrays", url: "https://leetcode.com/problems/intersection-of-two-arrays" },
    { id: 89, title: "Intersection of Two Arrays II", url: "https://leetcode.com/problems/intersection-of-two-arrays-ii" },
    { id: 90, title: "Logger Rate Limiter", url: "https://leetcode.com/problems/logger-rate-limiter" },
    { id: 91, title: "Valid Perfect Square", url: "https://leetcode.com/problems/valid-perfect-square" },
    { id: 92, title: "Guess Number Higher or Lower", url: "https://leetcode.com/problems/guess-number-higher-or-lower" },
    { id: 93, title: "Ransom Note", url: "https://leetcode.com/problems/ransom-note" },
    { id: 94, title: "First Unique Character in a String", url: "https://leetcode.com/problems/first-unique-character-in-a-string" },
    { id: 95, title: "Find the Difference", url: "https://leetcode.com/problems/find-the-difference" },
    { id: 96, title: "Is Subsequence", url: "https://leetcode.com/problems/is-subsequence" },
    { id: 97, title: "Binary Watch", url: "https://leetcode.com/problems/binary-watch" },
    { id: 98, title: "Sum of Left Leaves", url: "https://leetcode.com/problems/sum-of-left-leaves" },
    { id: 99, title: "Convert a Number to Hexadecimal", url: "https://leetcode.com/problems/convert-a-number-to-hexadecimal" },
    { id: 100, title: "Valid Word Abbreviation", url: "https://leetcode.com/problems/valid-word-abbreviation" },
    { id: 101, title: "Longest Palindrome", url: "https://leetcode.com/problems/longest-palindrome" },
    { id: 102, title: "Fizz Buzz", url: "https://leetcode.com/problems/fizz-buzz" },
    { id: 103, title: "Third Maximum Number", url: "https://leetcode.com/problems/third-maximum-number" },
    { id: 104, title: "Add Strings", url: "https://leetcode.com/problems/add-strings" },
    { id: 105, title: "Valid Word Square", url: "https://leetcode.com/problems/valid-word-square" },
    { id: 106, title: "Number of Segments in a String", url: "https://leetcode.com/problems/number-of-segments-in-a-string" },
    { id: 107, title: "Arranging Coins", url: "https://leetcode.com/problems/arranging-coins" },
    { id: 108, title: "Find All Numbers Disappeared in an Array", url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array" },
    { id: 109, title: "Assign Cookies", url: "https://leetcode.com/problems/assign-cookies" },
    { id: 110, title: "Repeated Substring Pattern", url: "https://leetcode.com/problems/repeated-substring-pattern" },
    { id: 111, title: "Hamming Distance", url: "https://leetcode.com/problems/hamming-distance" },
    { id: 112, title: "Island Perimeter", url: "https://leetcode.com/problems/island-perimeter" },
    { id: 113, title: "Number Complement", url: "https://leetcode.com/problems/number-complement" },
    { id: 114, title: "License Key Formatting", url: "https://leetcode.com/problems/license-key-formatting" },
    { id: 115, title: "Max Consecutive Ones", url: "https://leetcode.com/problems/max-consecutive-ones" },
    { id: 116, title: "Construct the Rectangle", url: "https://leetcode.com/problems/construct-the-rectangle" },
    { id: 117, title: "Teemo Attacking", url: "https://leetcode.com/problems/teemo-attacking" },
    { id: 118, title: "Next Greater Element I", url: "https://leetcode.com/problems/next-greater-element-i" },
    { id: 119, title: "Keyboard Row", url: "https://leetcode.com/problems/keyboard-row" },
    { id: 120, title: "Find Mode in Binary Search Tree", url: "https://leetcode.com/problems/find-mode-in-binary-search-tree" },
    { id: 121, title: "Base 7", url: "https://leetcode.com/problems/base-7" },
    { id: 122, title: "Relative Ranks", url: "https://leetcode.com/problems/relative-ranks" },
    { id: 123, title: "Perfect Number", url: "https://leetcode.com/problems/perfect-number" },
    { id: 124, title: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number" },
    { id: 125, title: "Detect Capital", url: "https://leetcode.com/problems/detect-capital" },
    { id: 126, title: "Longest Uncommon Subsequence I", url: "https://leetcode.com/problems/longest-uncommon-subsequence-i" },
    { id: 127, title: "Minimum Absolute Difference in BST", url: "https://leetcode.com/problems/minimum-absolute-difference-in-bst" },
    { id: 128, title: "Reverse String II", url: "https://leetcode.com/problems/reverse-string-ii" },
    { id: 129, title: "Diameter of Binary Tree", url: "https://leetcode.com/problems/diameter-of-binary-tree" },
    { id: 130, title: "Student Attendance Record I", url: "https://leetcode.com/problems/student-attendance-record-i" },
    { id: 131, title: "Reverse Words in a String III", url: "https://leetcode.com/problems/reverse-words-in-a-string-iii" },
    { id: 132, title: "Maximum Depth of N-ary Tree", url: "https://leetcode.com/problems/maximum-depth-of-n-ary-tree" },
    { id: 133, title: "Array Partition", url: "https://leetcode.com/problems/array-partition" },
    { id: 134, title: "Binary Tree Tilt", url: "https://leetcode.com/problems/binary-tree-tilt" },
    { id: 135, title: "Reshape the Matrix", url: "https://leetcode.com/problems/reshape-the-matrix" },
    { id: 136, title: "Subtree of Another Tree", url: "https://leetcode.com/problems/subtree-of-another-tree" },
    { id: 137, title: "Distribute Candies", url: "https://leetcode.com/problems/distribute-candies" },
    { id: 138, title: "N-ary Tree Preorder Traversal", url: "https://leetcode.com/problems/n-ary-tree-preorder-traversal" },
    { id: 139, title: "N-ary Tree Postorder Traversal", url: "https://leetcode.com/problems/n-ary-tree-postorder-traversal" },
    { id: 140, title: "Longest Harmonious Subsequence", url: "https://leetcode.com/problems/longest-harmonious-subsequence" },
    { id: 141, title: "Range Addition II", url: "https://leetcode.com/problems/range-addition-ii" },
    { id: 142, title: "Minimum Index Sum of Two Lists", url: "https://leetcode.com/problems/minimum-index-sum-of-two-lists" },
    { id: 143, title: "Can Place Flowers", url: "https://leetcode.com/problems/can-place-flowers" },
    { id: 144, title: "Construct String from Binary Tree", url: "https://leetcode.com/problems/construct-string-from-binary-tree" },
    { id: 145, title: "Merge Two Binary Trees", url: "https://leetcode.com/problems/merge-two-binary-trees" },
    { id: 146, title: "Swap Salary", url: "https://leetcode.com/problems/swap-salary" },
    { id: 147, title: "Maximum Product of Three Numbers", url: "https://leetcode.com/problems/maximum-product-of-three-numbers" },
    { id: 148, title: "Average of Levels in Binary Tree", url: "https://leetcode.com/problems/average-of-levels-in-binary-tree" },
    { id: 149, title: "Maximum Average Subarray I", url: "https://leetcode.com/problems/maximum-average-subarray-i" },
    { id: 150, title: "Set Mismatch", url: "https://leetcode.com/problems/set-mismatch" },
    { id: 151, title: "Two Sum IV - Input is a BST", url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst" },
    { id: 152, title: "Robot Return to Origin", url: "https://leetcode.com/problems/robot-return-to-origin" },
    { id: 153, title: "Image Smoother", url: "https://leetcode.com/problems/image-smoother" },
    { id: 154, title: "Second Minimum Node In a Binary Tree", url: "https://leetcode.com/problems/second-minimum-node-in-a-binary-tree" },
    { id: 155, title: "Longest Continuous Increasing Subsequence", url: "https://leetcode.com/problems/longest-continuous-increasing-subsequence" },
    { id: 156, title: "Valid Palindrome II", url: "https://leetcode.com/problems/valid-palindrome-ii" },
    { id: 157, title: "Baseball Game", url: "https://leetcode.com/problems/baseball-game" },
    { id: 158, title: "Alternating Bits", url: "https://leetcode.com/problems/alternating-bits" },
    { id: 159, title: "Count Binary Substrings", url: "https://leetcode.com/problems/count-binary-substrings" },
    { id: 160, title: "Degree of an Array", url: "https://leetcode.com/problems/degree-of-an-array" }
];

// Configuration
const USERNAME = 'amritrajjh17';
const SYNC_INTERVAL = 300000; // 5 minutes

// State management
let solvedProblems = JSON.parse(localStorage.getItem('leetcodeSolved')) || [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const grid = document.getElementById('problems-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalSolvedEl = document.getElementById('total-solved');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const syncStatusEl = document.getElementById('sync-status');

// Initialize
async function init() {
    renderProblems();
    updateStats();
    
    // Initial Sync
    await autoSync();
    
    // Polling Sync
    setInterval(autoSync, SYNC_INTERVAL);
    
    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProblems();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProblems();
        });
    });
}

async function autoSync() {
    syncStatusEl.textContent = 'Syncing...';
    syncStatusEl.classList.add('syncing');
    
    let submissions = [];
    let fetchSuccess = false;

    // Primary API
    try {
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data.recentSubmissions)) {
                submissions = data.recentSubmissions;
                fetchSuccess = true;
            }
        }
    } catch (err) {
        console.warn('Primary API failed, trying fallback API...', err);
    }

    // Fallback API
    if (!fetchSuccess) {
        try {
            const response = await fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/acSubmission`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.submission)) {
                    submissions = data.submission;
                    fetchSuccess = true;
                }
            }
        } catch (err) {
            console.error('Fallback API failed:', err);
        }
    }

    if (!fetchSuccess) {
        syncStatusEl.textContent = 'Sync Failed';
        syncStatusEl.classList.remove('syncing');
        return;
    }

    // Extract accepted titles and slugs
    const acceptedTitlesAndSlugs = new Set();
    submissions.forEach(sub => {
        const isAccepted = !sub.statusDisplay || sub.statusDisplay.toLowerCase() === 'accepted';
        if (isAccepted) {
            if (sub.title) acceptedTitlesAndSlugs.add(sub.title.toLowerCase().trim());
            if (sub.titleSlug) acceptedTitlesAndSlugs.add(sub.titleSlug.toLowerCase().trim());
        }
    });

    function getSlugFromUrl(url) {
        return url.replace(/\/$/, '').split('/').pop();
    }

    let newlySolved = 0;
    problemsData.forEach(problem => {
        const slug = getSlugFromUrl(problem.url);
        const isSolvedInApi = acceptedTitlesAndSlugs.has(problem.title.toLowerCase().trim()) || 
                              acceptedTitlesAndSlugs.has(slug.toLowerCase().trim());
        
        if (isSolvedInApi && !solvedProblems.includes(problem.id)) {
            solvedProblems.push(problem.id);
            newlySolved++;
        }
    });

    if (newlySolved > 0) {
        localStorage.setItem('leetcodeSolved', JSON.stringify(solvedProblems));
        renderProblems();
        updateStats();
    }

    syncStatusEl.textContent = 'Synced';
    syncStatusEl.classList.remove('syncing');
}

function toggleSolved(id) {
    if (solvedProblems.includes(id)) {
        solvedProblems = solvedProblems.filter(pid => pid !== id);
    } else {
        solvedProblems.push(id);
    }
    localStorage.setItem('leetcodeSolved', JSON.stringify(solvedProblems));
    updateStats();
    renderProblems();
}

function updateStats() {
    const solvedCount = solvedProblems.length;
    const totalCount = problemsData.length;
    const percentage = Math.round((solvedCount / totalCount) * 100);
    
    totalSolvedEl.textContent = solvedCount;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Completed`;
}

function renderProblems() {
    const filtered = problemsData.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery);
        const isSolved = solvedProblems.includes(p.id);
        
        if (currentFilter === 'solved') return matchesSearch && isSolved;
        if (currentFilter === 'unsolved') return matchesSearch && !isSolved;
        return matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">No problems found matching your criteria.</div>';
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="problem-card ${solvedProblems.includes(p.id) ? 'solved' : ''}" data-id="${p.id}">
            <div class="problem-info">
                <h3>${p.title}</h3>
                <a href="${p.url}" target="_blank" class="problem-link">
                    View on LeetCode
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
            <div class="problem-footer">
                <label class="solve-toggle">
                    <input type="checkbox" ${solvedProblems.includes(p.id) ? 'checked' : ''} onchange="toggleSolved(${p.id})">
                    <span class="checkbox-custom">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span class="status-label">${solvedProblems.includes(p.id) ? 'Solved' : 'Mark as Solved'}</span>
                </label>
            </div>
        </div>
    `).join('');
}

init();
