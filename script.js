const subnets = [
    {
        resourceGroup: "aspen",
        vnet: "aspen-vm-vnet",
        subnet: "aspen-subnet-apim",
        subnetId: "/subscriptions/SAMPLE-SUBSCRIPTION/resourceGroups/aspen/providers/Microsoft.Network/virtualNetworks/aspen-vm-vnet/subnets/aspen-subnet-apim",
        delegation: "Microsoft.ApiManagement/service",
        details: "API Management subnet"
    },
    {
        resourceGroup: "aspen",
        vnet: "aspen-vm-vnet",
        subnet: "aspen-subnet-app",
        subnetId: "/subscriptions/SAMPLE-SUBSCRIPTION/resourceGroups/aspen/providers/Microsoft.Network/virtualNetworks/aspen-vm-vnet/subnets/aspen-subnet-app",
        delegation: "None",
        details: "Application subnet"
    },
    {
        resourceGroup: "network-lab-rg",
        vnet: "network-lab-vnet",
        subnet: "default",
        subnetId: "/subscriptions/SAMPLE-SUBSCRIPTION/resourceGroups/network-lab-rg/providers/Microsoft.Network/virtualNetworks/network-lab-vnet/subnets/default",
        delegation: "None",
        details: "General-purpose subnet"
    }
];

const table = document.getElementById("subnetTable");
const search = document.getElementById("search");

function renderTable(filter = "") {
    const query = filter.toLowerCase().trim();

    const filtered = subnets.filter(item =>
        Object.values(item).some(value =>
            value.toLowerCase().includes(query)
        )
    );

    table.replaceChildren();

    filtered.forEach(item => {
        const row = document.createElement("tr");

        [
            item.resourceGroup,
            item.vnet,
            item.subnet,
            item.subnetId,
            item.delegation,
            item.details
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    document.getElementById("resultCount").textContent =
        `${filtered.length} of ${subnets.length} subnets shown`;
}

document.getElementById("vnetCount").textContent =
    new Set(subnets.map(item => item.vnet)).size;

document.getElementById("subnetCount").textContent = subnets.length;

document.getElementById("delegatedCount").textContent =
    subnets.filter(item => item.delegation !== "None").length;

search.addEventListener("input", event => renderTable(event.target.value));

renderTable();
