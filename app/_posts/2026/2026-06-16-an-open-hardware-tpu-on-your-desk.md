---
title: An Open Hardware TPU on Your Desk
author:
  - jenevieve-haggard
thumbnail: https://lil-blog-media.s3.amazonaws.com/IMG_0610-N4K.jpeg
tags:
  - hardware
  - open-source
  - ai-research
---
The open-source movement emphasizes the power of freely modifiable, flexible code to support transparency, collaboration, and building outside vendor lock-in. Open hardware extends that logic to the physical layer: chips you can read, modify, and build on. All software runs on hardware, and over the past few years, the ground under the hardware industry has been shifting. Since 2022, the [United States](https://www.congress.gov/crs-product/R48642), the [Netherlands, and Japan](https://www.csis.org/analysis/japan-and-netherlands-announce-plans-new-export-controls-semiconductor-equipment) have progressively tightened export controls on advanced chips and the equipment used to manufacture them; [China has responded with a state-backed effort to reproduce every layer of that supply chain at home](https://www.reuters.com/world/china/china-mandates-50-domestic-equipment-rule-chipmakers-sources-say-2025-12-30/). Policy analysts now routinely describe the trajectory as a "fragmentation" or "decoupling" of the global semiconductor market into separate technology spheres. Hardware costs are climbing across the board, so accessing open hardware feels all the more relevant for a group building open-source software.

Open hardware doesn't make the chips any cheaper. What it changes is what a chip you already own is allowed to become or what kinds of application-specific chips you can create. A single FPGA (Field-Programmable Gate Array) on a shelf can be a video codec today, a custom search accelerator the next, and a faithful copy of a decommissioned architecture the day after that. The unit cost is what it is; the value you can extract from that unit is no longer fixed by a vendor. For institutions whose time horizons stretch over decades, like libraries, archives, and public-interest research groups, that reconfigurability is the core of the open-hardware argument that compounds.

There are no known open-source hardware implementations of [Google's TPU](https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm), the in-house chip family Google designed to accelerate neural network math. The silicon is proprietary and not directly purchasable by consumers except in edge TPU form (e.g., [Google Coral](https://www.coral.ai/)). This field note reports a small experiment porting the [OpenTPU project](https://github.com/UCSBarchlab/OpenTPU), a Python simulation of Google's TPU published by UCSB's ArchLab, to an inexpensive FPGA board to explore the pros and cons of using more open hardware. To keep the experiment lightweight, most of the code was written by AI coding agents, with a human directing the work.

**Why FPGAs, For A Lab Like This One**

An FPGA (Field-Programmable Gate Array) is a chip whose internal logic can be reconfigured. You describe the circuit in a hardware description language, SystemVerilog, compile it to a bitstream, and load it onto the board. A CPU runs your program. An FPGA becomes your program. FPGAs are the obvious place to start, because they're the one piece of reconfigurable silicon a small lab can actually buy and program today.

The practical difference lies in the shape of the problems they solve. A CPU is a generalist reading a manual one step at a time. A GPU is a factory floor of thousands executing the exact same standard math in unison. An FPGA is a machine whose gears are configured to fit exactly one algorithm. They excel at problems with strange shapes. If your workload involves multiplying massive, uniform matrices to train a language model, you want a GPU. But if your work requires parsing millions of irregular text strings as they stream, finding exact bit-level matches across a sprawling archive, or piping data through a custom hash without ever pausing to fetch instructions from memory, an FPGA is arguably the more elegant approach. A dataset is sometimes only as legible as the software that reads it, and that software is only as runnable as the hardware underneath. An open FPGA design can preserve a faithful copy of obsolete circuitry, thereby preserving the means to read data, not just the data itself.

<figure class="items-center text-center">
  <a class="no-underline border-none bg-none" style="background: none;" href="https://www.wevolver.com/article/fpga">
    <img class="w-full" style="margin: 0;" src="https://lil-blog-media.s3.amazonaws.com/wevolver-fpga-diagram.png" alt="Diagram illustrating FPGA architecture." />
  </a>
  <figcaption>Source: <a href="https://www.wevolver.com/article/fpga">Wevolver</a></figcaption>
</figure>

For an institution like the lab, that distinction matters. Libraries, archives, public-interest research groups, and smaller labs deal with workloads and questions that are awkwardly sized: too large for a laptop, too specialized to deserve a recurring cloud bill, too long-running for any one grant cycle. For a well-resourced lab, the answer is cloud GPUs. For everyone else, the answer has historically been to wait or to scale down the question. That is why open hardware matters here: it gives smaller institutions a path to specialized computing without waiting for ideal market conditions.

A $300 board on a desk can run a custom-designed circuit, tailored to one workload, indefinitely, without anyone's permission and without a metered bill. A physical circuit sheds the overhead of an operating system and the constant fetch-and-exec cycle, drawing a fraction of the power of a standard CPU. For a public-interest lab, this efficiency makes running some workloads both financially and environmentally sustainable.

TPU-style architectures are particularly well-suited to this kind of work because of the systolic array at their core. A systolic array is a grid of small multiply-add units that pass partial results to their neighbors on every clock tick, making it efficient for matrix math because data flows through the grid rather than being fetched repeatedly from memory. That structure is designed for exactly the dense-matrix operations that underpin embedding generation, similarity search, and the neural network inference behind modern document analysis. This is the kind of regular, spatial structure FPGAs are built to host. A grid of identical small units, wired to their neighbors, all ticking together, is close to a literal description of what an FPGA's fabric already is.

Designs published openly in SystemVerilog are reusable across institutions, as open code is. What has kept this out of reach was never the silicon; it was the labor: months of vendor-tool learning, a small group of knowledgeable practitioners, and debugging cycles unique to physical systems. That cost is what AI coding agents have started to chip away at, making the open-hardware case more practical.

**Porting OpenTPU and the Silicon Boundary**

OpenTPU is a published academic re-implementation of Google's first-generation TPU implemented in Python code that models the hardware's behavior, not software meant to run on it. The hardware target of this experiment was the [Alchitry Pt v2](https://shop.alchitry.com/products/alchitry-pt), a roughly $300 board built on an Xilinx Artix-7 chip, with an add-on that exposes USB 3.0 to a host PC. I worked with AI coding agents to describe goals in plain English, review edits, and iterate. A sandbox repository came first: blink an LED, echo bytes, talk to the USB chip. That groundwork paid off within hours of starting the real port. The OpenTPU translation itself — the systolic matrix unit, the weight memory, the instruction decoder, the activation logic, and the host interface — went through seven planned phases. A few days of wall-clock time later, the SystemVerilog testbench ran the same matrix-multiply program as the original Python simulator and produced the same answer.

<figure class="items-center text-center">
  <img class="w-full" style="margin: 0;" src="https://lil-blog-media.s3.amazonaws.com/IMG_0610-N4K.jpeg" alt="Photo of the Alchitry Pt v2 FPGA board used in the experiment." />
  <figcaption>Source: Jenevieve Haggard, HLS LIL</figcaption>
</figure>

Translating Python that describes hardware into SystemVerilog that synthesizes hardware turns out to be something AI agents are somewhat capable of. The source is unambiguous, and the testbenches give instant feedback. The hard part was always the silicon boundary: a physical board, a vendor toolchain with subtle caching behavior, a USB chip with several gotchas. What worked was a scaffold around the agent that provided deterministic simulation tests for everything testable in software, plus on-board LEDs wired to specific finite-state-machine states, so a human eye could see what the testbench could not. A small notes tool called ["cq" (by Mozilla)](https://github.com/mozilla-ai/cq) recorded what each session learned and made future sessions read those notes first. By the end, the store held 48 entries, almost all painfully, expensively earned.

**Performance Realities and the USB Latency Bottleneck**

By the end, the FPGA produced output that matched a NumPy reference lane-for-lane on a 200-vector benchmark. End-to-end, it was about 2x faster than the original Python simulator; on compute alone, about 4x. It was also comfortably slower than a CPU running optimized BLAS on small inputs. The point of the result is not that the FPGA wins everywhere, but that it shows where open hardware can be useful.

At this workload size, USB round-trip latency dominates the FPGA's time budget. FPGAs win when data is moved to the device once, stays there, and is processed many times. Tiny inputs in, tiny outputs out, on every call, is the worst case for this design. We are running the worst case since we're just at the "make it work" stage. PCIe-attached FPGAs sit much closer to the CPU and avoid this bottleneck entirely; with batched workloads on that kind of board, the compute-side 4x advantage we already see should carry through to the end-to-end number. They're the natural next step for any workload where the dev-board numbers are encouraging enough to justify the cost.

**Open Hardware and the Lowered Cost of Specialization**

The lab occasionally runs computations large enough to be uncomfortable: searches over case law corpora and analyses across millions of documents. A pattern for designing a small piece of custom hardware that does those tasks well is a real option for problems that do not fit on a laptop and do not deserve a cloud bill.

More than preservation, open hardware offers freedom of access and the power to control your own collections, your own work, and your own computing. That opens up questions we are only beginning to ask. As archival media like silica and DNA-based storage mature, could open hardware lower the cost or complexity of building the readers required for those formats? As AI model architectures keep shifting, could a reconfigurable board keep pace in a way fixed silicon can't? FPGAs already take on inference tasks at places like CERN (see their [FPGA Developers Forum](https://fpga.web.cern.ch/)), adapting to software advances with matching hardware; could FPGAs do the same for our tasks?

AI coding agents are reducing the cost of specialized work that used to require a dedicated team. Custom hardware has historically been among the most specialized. If a small library research lab can produce a working SystemVerilog port of a real architecture in a few weeks, the question of what else has quietly come into reach is suddenly much broader.
